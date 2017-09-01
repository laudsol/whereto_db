exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('users_cities', (table)=> {
      table.increments();
      table.integer('user_id').references('users.id').notNullable().onDelete('cascade');
      table.integer('city_id').references('cities.id').notNullable().onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropFile('users_cities');
};
