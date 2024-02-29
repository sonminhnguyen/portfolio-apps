
exports.up = async (knex) => {
  await knex.schema.createTable('students', function(table) {
    table.increments('id');
    table.double('id_vk').unique();
    table.string('avatar').defaultTo(" ");
    table.string('name').defaultTo(" ");
    table.string('group').defaultTo(" ");
    table.string('year').defaultTo(" ");
    table.string('telephone').defaultTo(" ");
    table.string('email').defaultTo(" ");
    table.string('note').defaultTo(" ");
    table.string('linkVK').defaultTo(" ");
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  })
  
};

exports.down = async (knex) => {
  await knex.schema.dropTable('students');
};
