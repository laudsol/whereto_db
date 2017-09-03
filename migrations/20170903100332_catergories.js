exports.up = function(knex, Promise) {
  return knex.schema.createTable('categories',(table) =>{
    table.increments();
    table.string('type',255).unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropFile('categories');
};
