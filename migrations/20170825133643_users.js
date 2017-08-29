
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users',(table) =>{
    table.increments();
    table.string('first_name',255).notNullable();
    table.string('last_name',255).notNullable();
    table.string('fb_id',255).unique();
    table.specificType('hashed_password', 'char(60)').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropFile('users');
};
