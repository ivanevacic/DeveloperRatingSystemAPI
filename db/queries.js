const knex = require('./knex'); // Connection

module.exports = {
    //  Gets all developers from developers table
    getAll() {
        //  Selects all rows in 'developers' table
        return knex('developer');
    }
}