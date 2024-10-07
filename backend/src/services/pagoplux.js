const BASE_URL = 'https://apipre.pagoplux.com/intv1/'
const AUTH_HEADER = 'Basic ' + Buffer.from(`${process.env.PAGOPLUX_CLIENT}:${process.env.PAGOPLUX_SECRET}`).toString('base64')

export const getTransactionByIdService = async (idTransaction) => {
  const url = `${BASE_URL}integrations/getTransactionByIdStateResource?idTransaction=${idTransaction}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: AUTH_HEADER,
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`)
  }
  const data = await response.json()
  return data
}
