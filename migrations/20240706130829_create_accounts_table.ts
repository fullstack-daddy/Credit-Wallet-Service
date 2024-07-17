import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('accounts', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.decimal('balance', 14, 2).notNullable().defaultTo(0);
        table.timestamps(true, true);
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('accounts');
}

