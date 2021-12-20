import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("build_status").del();

    // Inserts seed entries
    await knex("build_status").insert([
        { id: 1, name: "PENDING" },
        { id: 2, name: "BUILDING" },
        { id: 3, name: "SUCCESS" },
        { id: 4, name: "FAILED" }
    ]);
};
