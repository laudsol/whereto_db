exports.up = function(knex, Promise) {
  return knex.schema.createTable('cities',(table) =>{
    table.increments();
    table.string('name',255).notNullable().unique();;
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropFile('cities');
};
