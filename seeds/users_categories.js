exports.seed = function(knex, Promise) {
  return knex('users_categories').del()
    .then(function () {
      return knex('users_categories').insert([
        // {id: 1, user_id: 1, place: 'Kentucky', category_id: 1},
        // {id: 2, user_id: 1, place: 'Zion National Park', category_id: 3}
      ]);
    })
    .then(function(){
    return knex.raw("SELECT setval('users_categories_id_seq', (SELECT MAX(id) FROM users_categories))");
    });
};
