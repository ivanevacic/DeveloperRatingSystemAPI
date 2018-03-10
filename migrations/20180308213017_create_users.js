exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', (table) => {
		//  Table data types
		table.increments('id').primary();
		table.text('email').unique().notNullable();
		table.text('password').notNullable();
		table.datetime('date').notNullable();
	});
}

exports.down = function(knex, Promise) {
		//	Drop table
		knex.schema.dropTable('users');
};