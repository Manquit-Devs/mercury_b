import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex('admin').del();

    await knex('admin').insert([
        { id: 1, username: 'admin', password: '21232f297a57a5a743894a0e4a801fc3' },
    ]);
};
