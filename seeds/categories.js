exports.seed = function(knex, Promise) {
  return knex('categories').del()
    .then(function () {
      return knex('categories').insert([
        {id: 1, type: 'state'},
        {id: 2, type: 'city'},
        {id: 3, type: 'national_park'},
        {id: 4, type: 'state_park'},
        {id: 5, type: 'national_forest'},
        {id: 6, type: 'state_forest'},
        {id: 7, type: 'national_grasslands'},
        {id: 8, type: 'national_monument'},
        {id: 9, type: 'national_preserve'},
        {id: 10, type: 'museum'},
        {id: 11, type: 'national_recreaction_area'},
        {id: 12, type: 'indian_reservation'},
        {id: 13, type: 'building'},
        {id: 14, type: 'city_4_let'},
        {id: 15, type: 'city_5_let'},
        {id: 16, type: 'city_3_vow'},
        {id: 17, type: 'city_4_vow'},
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
        {id: 29, type: 'monumnet'},
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
        {id: 40, type: 'other'},
        {id: 41, type: 'city_10_abc'},
        {id: 42, type: 'city_15_abc'},
        {id: 43, type: 'city_20_abc'},
        {id: 44, type: 'city_all_abc'}
      ]);
    })
    .then(function(){
    return knex.raw("SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories))");
  });
};
