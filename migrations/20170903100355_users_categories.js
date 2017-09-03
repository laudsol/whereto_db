exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('users_categories', (table)=> {
      table.increments();
      table.integer('user_id').references('users.id').notNullable().onDelete('cascade');
      table.string('place',255).notNullable();
      table.integer('category_id').references('categories.id').notNullable().onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropFile('users_categories');
};
