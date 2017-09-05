exports.seed = function(knex, Promise) {
  return knex('awards').del()
    .then(function () {
      return knex('awards').insert([
        {id: 1, type: 'City names starting with 10 different letters of the alphabet'},
        {id: 2, type: 'City names starting with 15 different letters of the alphabet'},
        {id: 3, type: 'City names starting with 20 different letters of the alphabet'},
        {id: 4, type: 'City names starting with every letters of the alphabet'},
        {id: 5, type: 'City names containing 3 of the same vowel'},
        {id: 6, type: 'City names containing 4 of the same vowel'},
        {id: 7, type: 'City names containing 3 of the same letter'},
        {id: 8, type: 'City names containing 4 of the same vowel'},
        {id: 9, type: 'City names containing 5 of the same vowel'},
        {id: 10, type: 'Visited 2 States'},
        {id: 11, type: 'Visited 5 States'},
        {id: 12, type: 'Visited 10 States'},
        {id: 13, type: 'Visited 20 States'},
        {id: 14, type: 'Visited 30 States'},
        {id: 15, type: 'Visited 40 States'},
        {id: 16, type: 'Visited every State'},
        {id: 17, type: 'National Park Badge'},
        {id: 18, type: 'National Park Frequent Visitor'},
        {id: 19, type: 'National Park Frequent Buff'},
        {id: 20, type: 'State Park Badge'},
        {id: 21, type: 'State Park Frequent Visitor'},
        {id: 22, type: 'State Park Frequent Buff'},
        {id: 23, type: 'National Grasslands Park Badge'},
        {id: 24, type: 'National Grasslands Frequent Visitor'},
        {id: 25, type: 'National Grasslands Frequent Buff'},
        {id: 26, type: 'National Monument Badge'},
        {id: 27, type: 'National Monument Frequent Visitor'},
        {id: 28, type: 'National Monument Frequent Buff'},
        {id: 26, type: 'National Preserve Badge'},
        {id: 27, type: 'National Preserve Frequent Visitor'},
        {id: 28, type: 'National Preserve Frequent Buff'},
        {id: 29, type: 'Library Badge'},
        {id: 30, type: 'Library Nerd'},
        {id: 41, type: 'Beach Badge'},
        {id: 42, type: 'Beach Bum'},
      ]);
    })
    .then(function(){
    return knex.raw("SELECT setval('awards_id_seq', (SELECT MAX(id) FROM awards))");
  });
};
