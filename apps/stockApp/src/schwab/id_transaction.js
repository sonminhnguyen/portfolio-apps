require('dotenv').config()
const fetch = require('node-fetch')
const { DateTime } = require('luxon')
const knex = require('../../database')
const login = require('./id_login')

const updateTransactions = (fromdate, todate) => login().then(cookies => {
  getTransactions({ cookies, fromdate, todate })
}).catch(e => console.log(e))
/*
 * fromdate, todate: dd/mm/yyyy
 */
const getTransactions = async ({ fromdate = DateTime.now().toFormat('dd/MM/yyyy'), todate = DateTime.now().toFormat('dd/MM/yyyy'), cookies }) => {
  const body = {
    mvLangId: 'vn',
    mvMode: 'QUERYTRADINGHISTORY',
    mvParam: JSON.stringify({
      fromdate,
      todate,
      subAccountId: '',
      code: ''
    })
  }
  const res = await fetch(process.env.ID_URL_TRANSACTION, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
      Cookie: cookies.join(';')
    },
    body: new URLSearchParams(body).toString()
  })

  try {
    const json = await res.json()
    console.log(json);
    if (!('list' in json.jsonObj)) {
      console.log(json)
      return
    }
    if (json.jsonObj.list.length === 0) {
      return
    }
    const transactions = json.jsonObj.list.map(_ => ({
      ..._,
      PaymentDate: DateTime.fromFormat(_.PaymentDate, 'dd/mm/yyyy').toFormat('yyyy-mm-dd'),
      TradeDate: DateTime.fromFormat(_.TradeDate, 'dd/mm/yyyy').toFormat('yyyy-mm-dd')
    }))

    await knex('id_transactions').insert(transactions)
    knex.destroy()
  } catch (e) {
    console.log(e)
  }
}  
// updateTransactions('08/08/2021', '08/10/2021');
module.exports = updateTransactions