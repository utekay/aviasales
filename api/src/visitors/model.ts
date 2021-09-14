import { Client, Pool, QueryResult } from 'pg'

import { IVisitor } from './types'

interface IProps {
  db: Client | Pool
}

export const createModel = ({
  db,
}: IProps) => {

  const getVisitor = async (id: IVisitor['id']): Promise<QueryResult<IVisitor>> => {
    return db.query(`
      SELECT 
        * 
      FROM 
        public.visitors 
      WHERE
        id = $1
      ;
    `, [id])
  }

  const createVisitor = async (visitor: IVisitor): Promise<void> => {
    await db.query(`
      INSERT INTO 
        public.visitors (
          id,
          shared,
          email
        )
      VALUES (
        $1,
        $2,
        $3
      )
    `, [
      visitor.id,
      visitor.shared,
      visitor.email,
    ])
  }

  const updateVisitor = async (visitor: IVisitor): Promise<QueryResult> => {
    return await db.query(`
      UPDATE 
        public.visitors
      SET 
        shared = $2,
        email = $3
      WHERE
        id = $1
      ;
    `, [
      visitor.id,
      visitor.shared,
      visitor.email,
    ])
  }

  return {
    getVisitor,
    createVisitor,
    updateVisitor,
  }
}