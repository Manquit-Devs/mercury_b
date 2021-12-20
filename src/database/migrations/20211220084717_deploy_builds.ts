import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('deploy_builds', (table: Knex.TableBuilder) => {
    table.increments('id');
    table.string('commit').notNullable();
    table.string('sender').notNullable();
    table.date('date').notNullable();
    table.integer('deploy_id');
    table.foreign('deploy_id').references('deploy.id');
    table.integer('status_id');
    table.foreign('status_id').references('build_status.id');
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('deploy_builds');
}

