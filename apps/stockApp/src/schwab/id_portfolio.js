require('dotenv').config()
const knex = require('../../database')
const fetch = require('node-fetch')
const login = require('./id_login')

const updatePortfolio = () => login().then(cookies => {
  getPortfolio({ cookies })
}).catch(e => console.log(e))

const getPortfolio = async ({ cookies }) => {
  const res = await fetch(process.env.ID_URL_PORTFOLIO, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
      Cookie: cookies.join(';')
    },
    body: 'mvLangId=vn&mvMode=PORTFOLIO'
  })
  const json = await res.json()
  await knex('id_portfolio').truncate()
  await knex('id_portfolio').insert(json.jsonObj.list)
  knex.destroy()
}
module.exports = updatePortfolio


