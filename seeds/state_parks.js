exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('state_parks').del()
    .then(function () {
      // Inserts seed entries
      return knex('state_parks').insert([
        {id: 1, name: 'Eldorado Canyon State Park'},
        {id: 2, name: 'Big Arm State Park'}
      ]);
    })
    .then(function(){
    return knex.raw("SELECT setval('state_parks_id_seq', (SELECT MAX(id) FROM state_parks))");
    });
};
