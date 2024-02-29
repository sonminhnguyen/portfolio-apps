const fs = require('fs')
const csv = require('csv-parser')
const knex = require('../../database')
const glob = require('glob')
const path = require('path')

const results = []

const files = glob.sync(path.join(__dirname, '..', 'data', 'Transactions*'), {})

if (files.length !== 0) {
  fs.createReadStream(files[0])
    .pipe(csv())
    .on('data', (data) => {
      const [underlyingSymbol, , securityType] = data.Symbol.split(' ')
      results.push({
        symbol: data.Symbol,
        security_type: securityType,
        underlying_symbol: underlyingSymbol,
        quantity: parseInt(data.Quantity),
        action: data.Action,
        amount: parseFloat(data.Amount.replace('$', ''))
      })
    })
    .on('end', async () => {
      results.splice(-1, 1)
      try {
        await knex('sch_transactions').insert(results)
        knex.destroy()
        fs.unlink(files[0], (err) => {
          if (err) {
            console.error(err)
          } else {
            console.log('ASYNC DELETE OK')
          }
        })
      } catch (e) {
        console.log(e)
      }
    })
}
