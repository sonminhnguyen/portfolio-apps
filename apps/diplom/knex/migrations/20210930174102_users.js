exports.up = async (knex) => {
    await knex.schema.createTable('users', function(table) {
      table.increments('id');
      table.string('avatar').defaultTo(null);
      table.string('username').unique().notNullable();
      table.string('password').notNullable().defaultTo("123456789");
      table.string('telephone').defaultTo(null);
      table.string('email').defaultTo(null);
      table.string('role').defaultTo("user");
    });
  };
  
exports.down = async (knex) => {
    await knex.schema.dropTable('users');
};