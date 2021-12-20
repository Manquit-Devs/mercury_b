// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: "./mercurydb.sqlite"
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'src/database/migrations',
    }
  },

  staging: {
    client: 'sqlite3',
    connection: {
      filename: "./mercurydb.sqlite"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'src/database/migrations',
    }
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: "./mercurydb.sqlite"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'src/database/migrations',
    }
  }
};
