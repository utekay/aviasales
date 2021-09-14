import { Client, Pool } from 'pg'

import { IVisitor } from './types'

interface IProps {
  db: Client | Pool
}

export const createModel = ({
  db,
}: IProps) => {

  const getVisitor = async (id: IVisitor['id']): Promise<IVisitor | undefined> => {
    const results = await db.query(`
      SELECT 
        * 
      FROM 
        public.visitors 
      WHERE
        id = $1
      ;
    `, [id])

    switch (results.rowCount) {
      case 0: {
        return undefined
      }
      case 1: {
        return results.rows[0]
      }
      default: {
        throw new Error('getVisitor() returned more than one visitor')
      }
    }
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

  const updateVisitor = async (visitor: IVisitor): Promise<void> => {
    await db.query(`
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