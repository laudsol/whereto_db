exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cities').del()
    .then(function () {
      // Inserts seed entries
      return knex('cities').insert([
        {id: 1, name: 'Boulder'},
        {id: 2, name: 'San Francisco'}
      ]);
    })
    .then(function(){
    return knex.raw("SELECT setval('cities_id_seq', (SELECT MAX(id) FROM cities))");
  });
};
