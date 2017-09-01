exports.up = function(knex, Promise) {
  return knex.schema.createTable('national_parks',(table) =>{
    table.increments();
    table.string('name',255).notNullable().unique();;
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropFile('national_parks');
};
