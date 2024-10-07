import bcrypt from 'bcrypt'

const hashData = async (data, saltRounds = 10) => {
  try {
    const hashedData = await bcrypt.hash(data, saltRounds)
    return hashedData
  } catch (error) {
    throw new Error(`Error al hashear los datos: ${error.message}`)
  }
}

const verifyHashedData = async (unhashed, hashed) => {
  try {
    const isMatch = await bcrypt.compare(unhashed, hashed)
    return isMatch
  } catch (error) {
    throw new Error(`Error al verificar los datos hasheados: ${error.message}`)
  }
}

export { hashData, verifyHashedData }
