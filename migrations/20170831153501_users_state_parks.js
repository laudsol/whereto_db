exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('users_state_parks', (table)=> {
      table.increments();
      table.integer('user_id').references('users.id').notNullable().onDelete('cascade');
      table.integer('state_park_id').references('state_parks.id').notNullable().onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropFile('users_state_parks');
};
