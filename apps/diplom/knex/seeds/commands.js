/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const { mock } = require('../mock/mockCommand')

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  const concat = [...mock]
  const command = mock.map(data => {
    return {
      id: data.id,
      label: data.label,
      depth: data.depth
    }
  })
  const children = []
  mock.map(data => 
      data.children.map(child => {
        children.push( {
          id: child.id,
          label: child.label,
          depth: child.depth,
          answer: child.answer,
          file: child.file,
          idparent: child.idparent,
        })
      })
  )
  await knex('commands').truncate()
  await knex('commandChildrens').truncate()
  await knex('commands').insert([...command]);
  await knex('commandChildrens').insert([...children]);
};
