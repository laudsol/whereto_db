exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_cities').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_cities').insert([
        {id: 1, user_id: 1, city_id : 1},
        {id: 2, user_id: 1, city_id : 2}
      ]);
    })
    .then(function(){
    return knex.raw("SELECT setval('users_cities_id_seq', (SELECT MAX(id) FROM users_cities))");
    });
};
