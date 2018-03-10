	exports.up = function(knex, Promise) {
		return knex.schema.createTable('developers', (table) => {
			//  Table data types
			table.increments('id').primary();
				table.text('full_name');
				table.text('position');
				table.float('rating');
				table.integer('user_id').unsigned();
				table.foreign('user_id').references('users.id');
		});
	}
	
	exports.down = function(knex, Promise) {
		//	Drop table
		knex.schema.dropTable('developers');
	};
	