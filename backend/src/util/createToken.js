import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const { TOKEN_KEY, TOKEN_EXPIRY } = process.env

const createToken = async (
  tokenData,
  tokenKey = TOKEN_KEY,
  expiresIn = TOKEN_EXPIRY
) => {
  try {
    const token = await jwt.sign(tokenData, tokenKey, { expiresIn })
    return token
  } catch (error) {
    throw new Error(`Error al crear el token: ${error.message}`)
  }
}

export { createToken }
