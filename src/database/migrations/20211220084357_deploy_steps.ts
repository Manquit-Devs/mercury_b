import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('deploy_steps', (table: Knex.TableBuilder) => {
    table.increments('id');
    table.string('name').notNullable();
    table.integer('order').notNullable();
    table.integer('typeId').notNullable();
    table.foreign('typeId').references('step_types.id');
    table.integer('deployId');
    table.foreign('deployId').references('deploy.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('deploy_steps');
}

