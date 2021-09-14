import { Pool } from 'pg'

export const db = new Pool({
  host: 'localhost',
  port: 5432,
  ssl: false,
  database: 'aviasales',
  user: 'aviasales',
  password: 'aviasales',
})