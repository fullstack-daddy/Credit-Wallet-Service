import knex from '../utils/database';
import dotenv from 'dotenv';

dotenv.config();

export interface Account {
  id?: number;
  name: string;
  email: string;
  balance: number;
  created_at?: Date;
  updated_at?: Date;
}

export const createAccount = async (account: Account): Promise<Account> => {
  const [newAccount] = await knex('accounts').insert(account).returning('*');
  return newAccount;
};

export const fundAccount = async (accountId: number, amount: number): Promise<Account> => {
  const [updatedAccount] = await knex('accounts')
    .where({ id: accountId })
    .increment('balance', amount)
    .returning('*');
  return updatedAccount;
};

export const transferFunds = async (fromAccountId: number, toAccountId: number, amount: number): Promise<void> => {
  await knex.transaction(async trx => {
    const [fromAccount] = await trx('accounts').where({ id: fromAccountId }).forUpdate();
    if (fromAccount.balance < amount) {
      throw new Error('Insufficient balance');
    }
    await trx('accounts').where({ id: fromAccountId }).decrement('balance', amount);
    await trx('accounts').where({ id: toAccountId }).increment('balance', amount);
  });
};

export const withdrawFunds = async (accountId: number, amount: number): Promise<Account> => {
  const [account] = await knex('accounts').where({ id: accountId });
  if (account.balance < amount) {
    throw new Error('Insufficient balance');
  }
  const [updatedAccount] = await knex('accounts')
    .where({ id: accountId })
    .decrement('balance', amount)
    .returning('*');
  return updatedAccount;
};

interface AdjutorResponse {
  status: string;
  message: string;
  meta: {
    balance: number;
  };
}

export const isBlacklisted = async (email: string): Promise<boolean> => {
  const apiKey = process.env.ADJUTOR_API_KEY;

  if (!apiKey) {
    throw new Error('ADJUTOR_API_KEY is not set in the environment variables');
  }

  const response = await fetch(`https://adjutor.lendsqr.com/verification/karma/${email}`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  });

  const result: AdjutorResponse = await response.json();

  // Assuming an email is blacklisted if the status is not "success"
  // or if the message indicates the identity is found in karma
  return result.status !== "success" || !result.message.includes("not found in karma");
};