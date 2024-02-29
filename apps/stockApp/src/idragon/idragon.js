const fetch = require('node-fetch')
const knex = require('../database')
const { DateTime } = require('luxon')

require('dotenv').config()

class Idragon {
    constructor(username = process.env.ID_USER, password = process.env.ID_PASS) {
        this.username = username
        this.password = password
        this.cookies = [];
    }

    getCookies() {
        return this.cookies
    }

    async login () {
        const body = {
            mvUserName: this.username,
            mvUserPwd: this.password,
            mvLandId: 'vn'
        }
        const res = await fetch(process.env.ID_URL_LOGIN, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'
          },
          body: new URLSearchParams(body).toString()
        })
        this.cookies = res.headers.raw()['set-cookie']
    }

    async getPortfolio () {
        const res = await fetch(process.env.ID_URL_PORTFOLIO, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
            Cookie: this.cookies.join(';')
          },
          body: 'mvLangId=vn&mvMode=PORTFOLIO'
        })
        const json = await res.json()
        await knex('id_portfolio').truncate()
        await knex('id_portfolio').insert(json.jsonObj.list)
        knex.destroy()
    }
    
    async getTransactions ({ fromdate = DateTime.now().toFormat('dd/MM/yyyy'), todate = DateTime.now().toFormat('dd/MM/yyyy') }) {
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
            Cookie: this.cookies.join(';')
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
}

const test = async () => {
    const idragon = new Idragon();
    await idragon.login();
    // await idragon.getPortfolio();
    // await idragon.getTransactions('08/08/2021', '08/09/2021');
}
test();