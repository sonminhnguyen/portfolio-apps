const fs = require('fs')
const csv = require('csv-parser')
const knex = require('../../database')
const { DateTime } = require('luxon')
const glob = require('glob')
const path = require('path')

const results = []
const files = glob.sync(path.join(__dirname, '..', 'data', 'Positions*'), {})

if (files.length !== 0) {
  fs.createReadStream(files[0])
    .pipe(csv({
      mapHeaders: ({ header, index }) => index === 0 ? 'symbol' : header
    }))
    .on('data', (data) => {
      const [underlyingSymbol, expirationDate, strike, securityType] = data.symbol.split(' ')
      results.push({
        symbol: data.symbol,
        security_type: securityType,
        underlying_symbol: underlyingSymbol,
        expiration_date: expirationDate ? DateTime.fromFormat(expirationDate, 'mm/dd/yyyy').toFormat('yyyy-mm-dd') : null,
        strike,
        quantity: parseInt(data['Quantity (Position)']),
        cost: parseFloat(data['Cost (Total Avg)'].replace('$', ''))
      })
    })
    .on('end', () => {
      results.splice(-1, 1)
      try {
        knex('sch_portfolio').insert(results).then(() => knex.destroy()).catch(e => console.log(e))
        fs.unlink(files[0], (err) => {
          if (err) {
            console.error(err)
          } else {
            console.log('ASYNC DELETE OK')
          }
        })
      } catch (e) {

      }
    })
}
