import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const { TOKEN_KEY } = process.env

const verifyToken = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']

  // Verificar si el token existe
  if (!token) {
    return res.status(403).send('Token no proveído')
  }

  // Verificar si el token es válido
  try {
    const decodedToken = await jwt.verify(token, TOKEN_KEY)
    req.currentUser = decodedToken
  } catch (error) {
    return res.status(401).send('Token inválido')
  }

  // Continuar con la petición
  return next()
}

export default verifyToken
