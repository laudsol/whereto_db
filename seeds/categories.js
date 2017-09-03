exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {id: 1, type: 'state'},
        {id: 2, type: 'city'},
        {id: 3, type: 'national_park'},
        {id: 4, type: 'state_park'},
        {id: 5, type: 'national_forest'},
        {id: 6, type: 'state_forest'},
        {id: 7, type: 'natinal_grasslands'},
        {id: 8, type: 'national_monument'},
        {id: 9, type: 'national_preserve'},
        {id: 10, type: 'museum'},
        {id: 11, type: 'national_recreaction_area'},
        {id: 12, type: 'indian_reservation'},
        {id: 13, type: 'building'},
        {id: 14, type: 'town_4_let'},
        {id: 15, type: 'town_5_let'},
        {id: 16, type: 'town_3_vow'},
        {id: 17, type: 'town_4_vow'},
        {id: 18, type: 'lake'},
        {id: 19, type: 'reservoir'},
        {id: 20, type: 'river'},
        {id: 21, type: 'dam'},
        {id: 22, type: 'wildlife_refuge'},
        {id: 23, type: 'farmers_market'},
        {id: 24, type: 'mountain'},
        {id: 25, type: 'canyon'},
        {id: 26, type: 'coutrhouse'},
        {id: 27, type: 'city_hall'},
        {id: 28, type: 'botanical_gardens'},
        {id: 29, type: 'moumnet'},
        {id: 30, type: 'antique_shop'},
        {id: 31, type: 'lighthouse'},
        {id: 32, type: 'tunnel'},
        {id: 33, type: 'bridge'},
        {id: 34, type: 'desert'},
        {id: 35, type: 'island'},
        {id: 36, type: 'beach'},
        {id: 37, type: 'zoo'},
        {id: 38, type: 'fort'},
        {id: 39, type: 'library'},
        {id: 40, type: 'other'}
      ]);
    })
    .then(function(){
    return knex.raw("SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories))");
  });
};
