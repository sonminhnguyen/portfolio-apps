/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
    await knex.schema.createTable('events', function(table) {
        table.increments('id');
        table.string('title').defaultTo(null);
        table.string('message').defaultTo(null);
        table.string('start').defaultTo(null);
        table.string('end').defaultTo(null);
        table.string('remindToGroup').defaultTo(null);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
    await knex.schema.dropTable('events');
};
