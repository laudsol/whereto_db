exports.seed = function(knex, Promise) {
  return knex('users_awards').del()
    .then(function () {
      return knex('users_awards').insert([
        // {id: 1, user_id: 1, award_id: 20},
        // {id: 2, user_id: 1, award_id: 30}
      ]);
    })
    .then(function(){
    return knex.raw("SELECT setval('users_awards_id_seq', (SELECT MAX(id) FROM users_awards))");
    });
};
