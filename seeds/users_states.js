
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_states').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_states').insert([
        {id: 1, user_id: 1, state_id: 1},
        {id: 2, user_id: 1, state_id: 2},
      ]);
    })
    .then(function(){
    return knex.raw("SELECT setval('users_states_id_seq', (SELECT MAX(id) FROM users_states))");
  });
};
