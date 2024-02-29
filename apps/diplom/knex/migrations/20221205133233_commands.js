/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('commands', function(table) {
        table.increments('id');
        table.string('label').unique().notNullable();
        table.integer('depth');
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    });
    await knex.schema.createTable('commandChildrens', function(table) {
        table.increments('id');
        table.string('label').notNullable();
        table.integer('depth');
        table.text('file');
        table.string('answer').notNullable();
        table.integer('idparent');
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
        // table.foreign('idparent').references('idcommand').inTable('commands');
    });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
    await knex.schema.dropTable('commandChildrens');
    await knex.schema.dropTable('commands');
};
