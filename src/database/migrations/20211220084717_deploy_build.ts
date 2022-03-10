import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('deploy_build', (table: Knex.TableBuilder) => {
    table.increments('id');
    table.string('commit').notNullable();
    table.string('sender').notNullable();
    table.date('date').notNullable();
    table.integer('deployId');
    table.foreign('deployId').references('deploy.id');
    table.integer('statusId');
    table.foreign('statusId').references('build_status.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('deploy_build');
}

