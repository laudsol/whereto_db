exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('states').del()
    .then(function () {
      // Inserts seed entries
      return knex('states').insert([
        {id: 1, name: 'Colorado'},
        {id: 2, name: 'Montana'}
      ]);
    })
    .then(function(){
    return knex.raw("SELECT setval('states_id_seq', (SELECT MAX(id) FROM states))");
    });
};
