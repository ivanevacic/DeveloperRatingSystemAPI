exports.up = function(knex, Promise) {
  return knex.schema.createTable('developer', (table) => {
    //  Table data types
    table.increments();
		table.text('full_name');
		table.text('position');
		table.float('rating');
  });
}

exports.down = function(knex, Promise) {
	//	Drop table
	knex.schema.dropTable('developer');
};
