import knex from './src/utils/database';

async function dropTables(): Promise<void> {
  try {
    // Drop accounts table if it exists
    const accountsTableExists = await knex.schema.hasTable('accounts');
    if (accountsTableExists) {
      await knex.schema.dropTable('accounts');
      console.log('Accounts table dropped successfully');
    } else {
      console.log('Accounts table does not exist');
    }

    // Drop users table if it exists
    const usersTableExists = await knex.schema.hasTable('users');
    if (usersTableExists) {
      await knex.schema.dropTable('users');
      console.log('Users table dropped successfully');
    } else {
      console.log('Users table does not exist');
    }
  } catch (error) {
    console.error('Error dropping tables:', error);
  } finally {
    await knex.destroy();
  }
}

dropTables();
