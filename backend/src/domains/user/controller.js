import User from './model.js'
import { hashData, verifyHashedData } from '../../util/hashData.js'
import { createToken } from '../../util/createToken.js'
import { getTransactionByIdService } from '../../services/pagoplux.js'

const authenticateUser = async (data) => {
  try {
    const { email, password } = data
    const fetchedUser = await User.findOne({ email })

    if (!fetchedUser) {
      throw new Error('Usuario no encontrado')
    }

    const hashedPassword = fetchedUser.password
    const passwordMatch = await verifyHashedData(password, hashedPassword)

    if (!passwordMatch) {
      throw new Error('Contraseña incorrecta')
    }

    // Generar token
    const tokenData = {
      userId: fetchedUser._id,
      email
    }
    const token = await createToken(tokenData)

    // Asignar token al usuario
    fetchedUser.token = token
    return fetchedUser
  } catch (error) {
    throw new Error(`Error al autenticar el usuario: ${error.message}`)
  }
}

const createNewUser = async (data) => {
  try {
    const { name, email, password } = data

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      throw Error('Email ya registrado')
    }

    // Hash password
    const hashedPassword = await hashData(password)
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    })
    const createdUser = await newUser.save()
    return createdUser
  } catch (error) {
    throw new Error(`Error al crear el usuario: ${error.message}`)
  }
}

const getTransactionById = async (req, res) => {
  const { idTransaction } = req.query

  if (!idTransaction) {
    return res.status(400).json({ message: 'Se requiere id transacción' })
  }

  try {
    const transaction = await getTransactionByIdService(idTransaction)
    return res.status(200).json(transaction)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export { createNewUser, authenticateUser, getTransactionById }
