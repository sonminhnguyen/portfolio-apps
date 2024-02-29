const { mock } = require('../mock/mockStudent')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  // console.log(mock);
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      const concat = [
        ...mock, 
      ]

      // console.log(concat);
      return knex('students').insert([...concat])
    });
};
