
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('states').del()
    .then(function () {
      // Inserts seed entries
      return knex('states').insert([
        {id: 1, name: 'Kentucky'},
        {id: 2, name: 'New Jersey'}
      ]);
    })
    .then(function(){
    return knex.raw("SELECT setval('states_id_seq', (SELECT MAX(id) FROM states))");
  });
};
