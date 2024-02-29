
exports.up = function (knex) {
    return knex.schema.withSchema(process.env.DB_SCHEMA)
        .createTable('sch_portfolio', function (table) {
            table.increments();
            table.string("symbol");
            table.string("security_type");
            table.string("underlying_symbol");
            table.date("expiration_date");
            table.float("strike");
            table.integer("quantity");
            table.float("cost");
        })
        .createTable('sch_transactions', function (table) {
            table.increments();
            table.string("symbol");
            table.string("security_type");
            table.string("underlying_symbol");
            table.date("expiration_date");
            table.float("strike");
            table.integer("quantity");
            table.float("amount");
            table.string("action");
        })
};

exports.down = function (knex) {
    return knex.schema.withSchema(process.env.DB_SCHEMA)
        .dropTable('sch_portfolio')
        .dropTable('sch_transactions')
};
