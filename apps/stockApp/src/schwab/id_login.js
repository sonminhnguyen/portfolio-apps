const fetch = require('node-fetch')
require('dotenv').config()

const body = {
  mvUserName: process.env.ID_USER,
  mvUserPwd: process.env.ID_PASS,
  mvLandId: 'vn'
}

const login = async () => {
  const res = await fetch(process.env.ID_URL_LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'
    },
    body: new URLSearchParams(body).toString()
  })
  const cookies = res.headers.raw()['set-cookie']
  return cookies
}

module.exports = login
