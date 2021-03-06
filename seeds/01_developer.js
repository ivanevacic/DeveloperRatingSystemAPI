//  Import seed values array
const developers = require('../developer_seeder_default');
//  Everytime we run seeder,current table data will be deleted and will be 'seeded' with this values here
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('developers').del()
    .then(function () {
      // Inserts seed entries
      return knex('developers').insert(developers);
    });
};
