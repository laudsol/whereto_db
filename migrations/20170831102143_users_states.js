
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('users_states', (table)=> {
      table.increments();
      table.integer('user_id').references('users.id').notNullable().onDelete('cascade');
      table.integer('state_id').references('states.id').notNullable().onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {

};
