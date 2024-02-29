const knex = require('../database')
require('dotenv').config()

const getPortfolio = async () => {
  return await knex.select().from('id_portfolio');
}
          
module.exports = {
  getPortfolio
}