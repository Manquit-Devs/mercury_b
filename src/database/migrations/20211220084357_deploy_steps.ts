import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('deploy_steps', (table: Knex.TableBuilder) => {
    table.increments('id');
    table.integer('order').notNullable();
    table.string('name').notNullable();
    table.string('command').notNullable();
    table.integer('deploy_id');
    table.foreign('deploy_id').references('deploy.id');
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('deploy_steps');
}

