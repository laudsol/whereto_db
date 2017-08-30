
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users',(table) =>{
    table.increments();
    table.string('fb_id',255).unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropFile('users');
};
