import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('build_status', (table: Knex.TableBuilder) => {
    table.increments('id');
    table.string('name').notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('deploy_builds');
  await knex.schema.dropTable('build_status');
}

