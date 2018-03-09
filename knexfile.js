// Update with your config settings.
module.exports = {
  development: {
    client: 'pg', //  PostgresSQL
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: '21031996',
      database: 'devratingsystem'
    }
  },
  //  Testing database
  test : {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: '21031996',
      database: 'devratingsystemtest'
    }
  }
};