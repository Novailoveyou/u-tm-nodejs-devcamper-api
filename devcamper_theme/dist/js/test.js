const makeReq = async (
  method = 'GET',
  url = '/api/v1/bootcamps',
  headers = {},
  body = {},
  apiURL = 'https://ipo-cp.ru'
) => {
  const config = {
    method,
    headers,
    body: JSON.stringify(body),
  }
  try {
    const res = await fetch(apiURL + url, config)
    const data = await res.json()
    console.log(data)
    return data
  } catch (err) {
    return err
  }
}

makeReq(
  'POST',
  '/api/v1/auth/login',
  { Accept: 'application/json', 'Content-Type': 'application/json' },
  { email: 'nover2@gmail.com', password: '123456' }
)
