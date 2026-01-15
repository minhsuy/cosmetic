import express from 'express'
import databaseService from './config/database'
import cors from 'cors'
import ENV from './env'
import { handleError } from './middlewares/errorHandler'
const app = express()
databaseService.connect()
app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
)
app.use(handleError)

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`)
})
