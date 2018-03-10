//  Import seed values array
const users = require('../user_seeder_default');
//  Everytime we run seeder,current table data will be deleted and will be 'seeded' with this values here
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert(users);
    });
};
