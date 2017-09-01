exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('users_national_parks', (table)=> {
      table.increments();
      table.integer('user_id').references('users.id').notNullable().onDelete('cascade');
      table.integer('national_park_id').references('national_parks.id').notNullable().onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropFile('users_national_parks');
};
