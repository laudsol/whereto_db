exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_state_parks').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_state_parks').insert([
        {id: 1, user_id: 1, state_park_id : 1},
        {id: 2, user_id: 1, state_park_id : 2}
      ]);
    })
    .then(function(){
    return knex.raw("SELECT setval('users_state_parks_id_seq', (SELECT MAX(id) FROM users_state_parks))");
    });
};
