import knex from 'knex';

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: "./mercurydb.sqlite"
  }
});

export default db;