const knex = require('./knex'); // Connection

module.exports = {
    //  Gets all developers from developers table
    getAll() {
        //  Selects all rows in 'developers' table
        return knex('developers');
    },
    //  Returns developer that matches id,and it returns first since there can only
    //  be one(id in unique)
    getOne(id) {
        //  Show developer information
        return knex('developers').where('id', id).first();
    },
    create(developer) {
        return knex('developers').insert(developer, '*') //  Returns all the properties of developer => array
    },
    update(id, developer) {
        //  Check if id is valid,pass update
        return knex('developers').where('id', id).update(developer, '*');
    },
    delete(id) {
        return knex('developers').where('id', id).del();
    },
    //  Auth route function
    getOneByEmail(email) {
        return knex('users').where('email', email).first();
    }
}