/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
    await knex.schema.createTable('requires', function(table) {
        table.increments('id');
        table.string('event').defaultTo(null);
        table.string('title').defaultTo(null);
        table.string('note').defaultTo(null);
        table.string('group').defaultTo(null);
        table.string('solved').defaultTo("0");
        //students table
        table.string('name').defaultTo(null);
        table.string('year').defaultTo(null);
        table.string('telephone').defaultTo(null);
        table.string('id_vk').defaultTo(null);
        table.string('linkVK').defaultTo(null);
        table.string('email').defaultTo(null);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
    await knex.schema.dropTable('requires');

};
