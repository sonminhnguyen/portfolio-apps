/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 const { mock } = require('../mock/mockRequire')

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('requires').del()
  await knex('requires').insert([...mock]);
};
