exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('users_national_forests', (table)=> {
      table.increments();
      table.integer('user_id').references('users.id').notNullable().onDelete('cascade');
      table.integer('national_forestsid').references('national_forests.id').notNullable().onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropFile('users_national_forests');
};
