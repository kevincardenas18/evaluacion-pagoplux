import express from 'express'
import { createNewUser, authenticateUser, getTransactionById } from './controller.js'
import auth from './../../middleware/auth.js'
const router = express.Router()

// Rutas protegidas
router.get('/protected', auth, (req, res) => {
  res.status(200).send({ message: `Ruta protegida por ${req.currentUser.email}` })
})

// Login
router.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body
    email = email.trim()
    password = password.trim()

    if (!(email && password)) {
      throw new Error('Campos vacíos')
    }

    const authenticatedUser = await authenticateUser({ email, password })

    res.status(200).json(authenticatedUser)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

// Register
router.post('/register', async (req, res) => {
  try {
    let { name, email, password } = req.body
    name = name.trim()
    email = email.trim()
    password = password.trim()

    if (!(name && email && password)) {
      throw new Error('Campos vacíos')
    } else if (!/^[a-zA-Z]*$/.test(name)) {
      throw new Error('Nombre inválido')
    } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
      throw new Error('Email inválido')
    } else if (password.length < 8) {
      throw new Error('Contraseña es muy corta')
    } else {
      const newUser = await createNewUser({
        name,
        email,
        password
      })
      res.status(200).json(newUser)
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.get('/transaction', getTransactionById)

export default router
