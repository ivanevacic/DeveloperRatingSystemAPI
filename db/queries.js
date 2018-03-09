const knex = require('./knex'); // Connection

module.exports = {
    //  Gets all developers from developers table
    getAll() {
        //  Selects all rows in 'developers' table
        return knex('developer');
    },
    //  Returns developer that matches id,and it returns first since there can only
    //  be one(id in unique)
    getOne(id) {
        //  Show developer information
        return knex('developer').where('id', id).first();
    },
    create(developer) {
        return knex('developer').insert(developer, '*') //  Returns all the properties of developer => array
    }
}