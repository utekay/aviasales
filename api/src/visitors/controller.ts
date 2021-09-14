import { RequestHandler } from 'express'
import { Client, Pool } from 'pg'

import { IVisitor } from './types'
import { createService, VisitorDoesNotExistError } from './service'
import * as utils from './utils'

interface IProps {
  db: Client | Pool
}

export const createController = ({
  db,
}: IProps) => {
  const __service = createService({
    db,
  })

  const getVisitor: RequestHandler = async (req, res) => {
    // A kind of shortcut.
    const visitorId = req.headers.authorization || ''
    if (visitorId === '') {
      const visitor = await __service.createVisitor()
      res.status(201).json(visitor)
      return
    }

    // Visitor [probably] exists.
    let visitor: IVisitor | null = null
    try {
      visitor = await __service.getVisitor(visitorId)
    } catch (e) {
      if (e instanceof VisitorDoesNotExistError) {
        res.status(400).end()
        return
      }
      res.status(500).end()
      return
    }
    res.status(200).json(visitor)
  }

  const setVisitorDidShare: RequestHandler = async (req, res) => {
    const visitorId = req.headers.authorization || ''
    if (visitorId === '') {
      res.status(400).end()
      return
    }

    try {
      await __service.setVisitorDidShare(visitorId)
    } catch (e) {
      if (e instanceof VisitorDoesNotExistError) {
        res.status(400).end()
        return
      }
      res.status(500).end()
      return
    }
    res.status(200).end()
  }

  const setVisitorDidSubscribe: RequestHandler = async (req, res) => {
    if (typeof req.body.email !== 'string' 
      || utils.isEmailValid(req.body.email) === false
    ) {
      res.status(400).end()
      return
    }

    const visitorId = req.headers.authorization || ''
    if (visitorId === '') {
      res.status(400).end()
      return
    }

    try {
      await __service.setVisitorDidSubscribe(visitorId, req.body.email)
    } catch (e) {
      if (e instanceof VisitorDoesNotExistError) {
        res.status(400).end()
        return
      }
      res.status(500).end()
      return
    }
    res.status(200).end()
  }

  return {
    getVisitor,
    setVisitorDidShare,
    setVisitorDidSubscribe,
  }
}