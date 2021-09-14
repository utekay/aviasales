import { Client, Pool } from 'pg'
import { v4 as uuidv4 } from 'uuid'

import { IVisitor } from './types'
import { createModel } from './model'
import * as utils from './utils'

interface IProps {
  db: Client | Pool
}

export const createService = ({ 
  db,
}: IProps) => {
  const __model = createModel({
    db,
  })

  const getVisitor = async (id: IVisitor['id']): Promise<IVisitor> => {
    const results = await __model.getVisitor(id)
    switch (results.rowCount) {
      case 0: {
        throw new VisitorDoesNotExistError()
      }
      case 1: {
        return results.rows[0]
      }
      default: {
        throw new Error('getVisitor() returned more than one visitor')
      }
    }
  }

  const createVisitor = async (): Promise<IVisitor> => {
    const visitor = {
      id: uuidv4(),
      shared: false,
      email: '',
    }
    await __model.createVisitor(visitor)
    return visitor
  }

  const setVisitorDidShare = async (id: IVisitor['id']) => {
    const visitor = await getVisitor(id)
    await __model.updateVisitor({
      ...visitor,
      shared: true,
    })
  }

  const setVisitorDidSubscribe = async (id: IVisitor['id'], email: IVisitor['email']) => {
    const visitor = await getVisitor(id)
    await __model.updateVisitor({
      ...visitor,
      email,
    })
  }

  return {
    getVisitor,
    createVisitor,
    setVisitorDidShare,
    setVisitorDidSubscribe,
  }
}

export class VisitorDoesNotExistError extends Error {
  constructor () {
    super()
    this.name = 'VisitorDoesNotExistError'
  }
}

