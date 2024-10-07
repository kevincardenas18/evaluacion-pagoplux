import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const { MONGODB_URI } = process.env

const connectToDB = async () => {
  const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } }

  try {
    await mongoose.connect(MONGODB_URI, clientOptions)
    console.log('Connected to MongoDB')
    await mongoose.connection.db.admin().command({ ping: 1 })
    console.log('Pinged your deployment. You successfully connected to MongoDB!')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message)
  }
}

connectToDB()
