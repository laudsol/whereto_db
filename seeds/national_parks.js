exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('national_parks').del()
    .then(function () {
      // Inserts seed entries
      return knex('national_parks').insert([
        {id: 1, name: 'Zion National Park'},
        {id: 2, name: 'Rocky Mountain National Park'}
      ]);
    })
    .then(function(){
    return knex.raw("SELECT setval('national_parks_id_seq', (SELECT MAX(id) FROM national_parks))");
    });  
};
