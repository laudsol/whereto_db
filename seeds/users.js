
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {id: 0, first_name: 'sol',last_name:'laudon',fb_id:'',hashed_password:'somepassword'}
      ]);
    });
};
