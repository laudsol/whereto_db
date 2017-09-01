exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('national_forests').del()
    .then(function () {
      // Inserts seed entries
      return knex('national_forests').insert([
        {id: 1, name: 'White River National Forest'},
        {id: 2, name: 'Roosevelt National Park'}
      ]);
    })
    .then(function(){
    return knex.raw("SELECT setval('national_forests_id_seq', (SELECT MAX(id) FROM national_forests))");
    });
};
