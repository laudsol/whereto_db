exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('users_awards', (table)=> {
      table.increments();
      table.integer('user_id').references('users.id').notNullable().onDelete('cascade');
      table.integer('award_id').references('awards.id').notNullable().onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropFile('users_awards');
};
