import express from 'express'
import cors from 'cors'
// import cookieParser from 'cookie-parser'

import { db } from './db'
import { createController } from './visitors/controller'

const PORT = 8000

const app = express()
const apiRouter = express.Router()

const visitorController = createController({
  db,
})

app.use('/api', apiRouter)

apiRouter.use(cors({
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
apiRouter.use(express.json())

apiRouter.get('/get-visitor', visitorController.getVisitor)
apiRouter.post('/set-visitor-did-share', visitorController.setVisitorDidShare)
apiRouter.post('/set-visitor-did-subscribe', visitorController.setVisitorDidSubscribe)

app.listen(PORT, () => {
  console.log(`Server is running at :${PORT}`)
})