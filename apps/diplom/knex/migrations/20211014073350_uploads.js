
exports.up = async (knex) => {
    await knex.schema.createTable('uploads', function(table) {
        table.increments('id_upload');
        table.integer('id_user').notNullable();
        table.integer('onwer_id').notNullable();
        table.string('id_doc').unique().notNullable();
        table.string('title').notNullable();
        table.string('url').notNullable();
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
        // table.foreign('id_user').references('id_user').inTable('users');
    });
};

exports.down = async(knex) => {
    await knex.schema.dropTable('uploads');
};
