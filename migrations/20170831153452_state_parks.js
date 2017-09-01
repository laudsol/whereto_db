exports.up = function(knex, Promise) {
  return knex.schema.createTable('state_parks',(table) =>{
    table.increments();
    table.string('name',255).notNullable().unique();;
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropFile('state_parks');
};
