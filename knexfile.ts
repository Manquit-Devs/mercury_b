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
    },
    seeds: {
      directory: "./src/database/seeds",
    },
    pool: {
      min: 2,
      max: 10
    },
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
    },
    seeds: {
      directory: "./src/database/seeds",
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
    },
    seeds: {
      directory: "./src/database/seeds",
    }
  }
};
