import express from 'express'
import cors from 'cors'
// import cookieParser from 'cookie-parser'

import { db } from './db'
import { createController } from './visitors/controller'

const app = express()

const visitorController = createController({
  db,
})

app.use(cors({
  allowedHeaders: [
    'Authorization',
    'Content-Type',
    'Origin',
  ],
  methods: [
    'GET',
    'POST',
  ],
  origin: '*',
}))
// app.use(cookieParser())
app.use(express.json())

app.get('/get-visitor', visitorController.getVisitor)
app.post('/set-visitor-did-share', visitorController.setVisitorDidShare)
app.post('/set-visitor-did-subscribe', visitorController.setVisitorDidSubscribe)

app.listen(8000, () => {
  console.log("Server is at :8000")
})