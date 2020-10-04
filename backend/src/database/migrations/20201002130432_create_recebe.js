
exports.up = function(knex) {
    return knex.schema.createTable('recebe', function(table){
        table.increments('id_recebe').unsigned();
        table.integer('id_usuario').notNullable().unsigned();
        table.integer('id_mensagem').notNullable().unsigned();
        table.foreign('id_usuario').references('id_usuario').inTable('usuario');
        table.foreign('id_mensagem').references('id_mensagem').inTable('mensagem');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('recebe');
};
