import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("step_types").del();

    // Inserts seed entries
    await knex("step_types").insert([
        { id: 1, name: "COMMAND" },
    ]);
};
