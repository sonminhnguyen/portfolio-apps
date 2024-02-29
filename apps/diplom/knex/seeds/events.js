/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const { mock } = require('../mock/mockEvent')

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // console.log(mock);
  await knex('events').del()
  await knex('events').insert([...mock]);
};
