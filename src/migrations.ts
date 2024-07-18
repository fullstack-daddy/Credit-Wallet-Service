import { Knex } from 'knex';
import knex from './utils/database';

async function createTables(): Promise<void> {
  try {
    // Check if users table exists
    const usersTableExists = await knex.schema.hasTable('users');
    if (!usersTableExists) {
      // Create users table
      await knex.schema.createTable('users', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.string('name').notNullable();
        table.timestamps(true, true);
      });
      console.log('Users table created successfully');
    } else {
      console.log('Users table already exists');
    }

    // Check if accounts table exists
    const accountsTableExists = await knex.schema.hasTable('accounts');
    if (!accountsTableExists) {
      // Create accounts table
      await knex.schema.createTable('accounts', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.integer('userId').unsigned().references('id').inTable('users');
        table.string('accountId').unique().notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.decimal('balance', 10, 2).defaultTo(0);
        table.timestamps(true, true);
      });
      console.log('Accounts table created successfully');
    } else {
      console.log('Accounts table already exists');
    }
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    await knex.destroy();
  }
}

createTables().catch((error) => {
  console.error('Unhandled error in createTables:', error);
  process.exit(1);
});