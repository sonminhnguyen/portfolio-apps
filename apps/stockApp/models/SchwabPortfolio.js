const knex = require('../database')

const all = async () => {
    return await knex('sch_portfolio')
} 

module.exports = { all }