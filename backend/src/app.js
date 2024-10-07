import express from 'express'
import cors from 'cors'
import routes from './routes/index.js'
import './config/db.js'

const bodyParser = express.json
const app = express()

app.use(cors())
app.use(bodyParser())
app.use('/api/v1', routes)

export default app
