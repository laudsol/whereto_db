exports.seed = function(knex, Promise) {
  return knex('awards').del()
    .then(function () {
      return knex('awards').insert([
        {id: 1, type: '10 alphabetic cities!'},
        {id: 2, type: '15 alphabetic cities!'},
        {id: 3, type: '20 alphabetic cities!'},
        {id: 4, type: 'All alphabetic cities!'},
        {id: 5, type: 'city with 3 matching vowels'},
        {id: 6, type: 'city with 4 matching vowels'},
        {id: 7, type: 'city with 4 matching letters'},
        {id: 8, type: 'city with 5 matching letters'},
        {id: 10, type: 'States: 2!'},
        {id: 11, type: 'States: 10!'},
        {id: 12, type: 'States: 20!'},
        {id: 13, type: 'States: 30!'},
        {id: 14, type: 'States: 40!'},
        {id: 15, type: 'States: 50!'},
        {id: 17, type: 'National Park Badge'},
        {id: 18, type: 'National Park Frequentor'},
        {id: 19, type: 'National Park Buff'},
        {id: 20, type: 'State Park Badge'},
        {id: 21, type: 'State Park Frequentor'},
        {id: 22, type: 'State Park Buff'},
        {id: 23, type: 'National Grasslands Park Badge'},
        {id: 24, type: 'National Grasslands Frequentor'},
        {id: 25, type: 'National Grasslands Buff'},
        {id: 26, type: 'National Monument Badge'},
        {id: 27, type: 'National Monument Frequentor'},
        {id: 28, type: 'National Monument Buff'},
        {id: 29, type: 'National Preserve Badge'},
        {id: 30, type: 'National Preserve Frequentor'},
        {id: 31, type: 'National Preserve Buff'},
        {id: 32, type: 'Library Badge'},
        {id: 33, type: 'Library Worm'},
        {id: 34, type: 'Nerd'},
        {id: 35, type: 'Beach Badge'},
        {id: 36, type: 'Beach Bum'}
      ]);
    })
    .then(function(){
    return knex.raw("SELECT setval('awards_id_seq', (SELECT MAX(id) FROM awards))");
  });
};
