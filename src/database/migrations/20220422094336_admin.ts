import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('admin', (table: Knex.TableBuilder) => {
    table.increments('id');
    table.string('username').notNullable();
    table.string('password').notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('admin');
}

