import app from './app.js'
import { PORT } from './config/config.js'

const starApp = () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

starApp()
