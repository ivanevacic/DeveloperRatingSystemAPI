// Update with your config settings.
module.exports = {
  development: {
    client: 'pg', //  PostgresSQL
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'ivan',
      database: 'developer-rating-system'
    }
  },
  //  Testing database
  test : {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'ivan',
      database: 'developer-rating-system-test'
    }
  }
};
