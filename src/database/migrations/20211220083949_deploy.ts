import knex, { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('deploy', (table: Knex.TableBuilder) => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('description');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('deploy');
}

