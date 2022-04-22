import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('step_command', (table: Knex.TableBuilder) => {
    table.increments('id');
    table.string('command').notNullable();
    table.integer('stepId');
    table.foreign('stepId').references('deploy_step.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('step_command');
}
