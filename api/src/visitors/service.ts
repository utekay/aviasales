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
    const visitor = await __model.getVisitor(id)
    if (visitor === undefined) {
      throw new VisitorDoesNotExistError()
    }
    return {
      ...visitor,
      email: utils.getMaskedEmail(visitor.email), // secure
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
    const visitor = await __model.getVisitor(id)
    if (visitor === undefined) {
      throw new VisitorDoesNotExistError()
    }

    await __model.updateVisitor({
      ...visitor,
      shared: true,
    })
  }

  const setVisitorDidSubscribe = async (id: IVisitor['id'], email: IVisitor['email']) => {
    const visitor = await __model.getVisitor(id)
    if (visitor === undefined) {
      throw new VisitorDoesNotExistError()
    }

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