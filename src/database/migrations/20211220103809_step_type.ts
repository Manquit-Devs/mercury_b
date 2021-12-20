import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('step_types', (table: Knex.TableBuilder) => {
    table.increments('id');
    table.string('name').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('step_types');
}

