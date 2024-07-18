import knex from "../utils/database";
import dotenv from "dotenv";

dotenv.config();

export interface Account {
  id?: number;
  userId: number;
  accountId: string;
  name: string;
  email: string;
  balance: number;
  created_at?: Date;
  updated_at?: Date;
}

export const createAccount = async (account: Omit<Account, 'id' | 'accountId'>): Promise<Account> => {
  const accountId = generateUniqueAccountId();
  const [id] = await knex("accounts").insert({ ...account, accountId });
  
  const createdAccount = await knex("accounts").where({ id }).first();
  
  return createdAccount;
};

// Helper function to generate a unique accountId
function generateUniqueAccountId(): string {
  return Math.random().toString(36).substr(2, 9).toUpperCase();
}

export const getAccountByUserId = async (userId: number): Promise<Account | undefined> => {
  return knex("accounts").where({ userId }).first();
};

export const fundAccount = async (accountId: number, amount: number): Promise<{ message: string, balance: number }> => {
  await knex('accounts')
    .where({ id: accountId })
    .increment('balance', amount);

  const updatedAccount = await knex('accounts')
    .where({ id: accountId })
    .select('balance')
    .first();

  if (!updatedAccount) {
    throw new Error(`Account with id ${accountId} not found or update failed`);
  }

  return {
    message: 'Transaction successful',
    balance: updatedAccount.balance
  };
};

export const transferFunds = async (
  fromAccountId: number,
  toAccountId: number,
  amount: number
): Promise<{ message: string, balance: number }> => {
  let fromAccountBalance: number = 0;

  await knex.transaction(async (trx) => {
    const fromAccount = await trx("accounts")
      .where({ id: fromAccountId })
      .select('balance')
      .first();
    if (!fromAccount || fromAccount.balance < amount) {
      throw new Error("Insufficient balance");
    }
    await trx("accounts")
      .where({ id: fromAccountId })
      .decrement("balance", amount);
    await trx("accounts")
      .where({ id: toAccountId })
      .increment("balance", amount);
    
    const updatedFromAccount = await trx("accounts")
      .where({ id: fromAccountId })
      .select('balance')
      .first();
    fromAccountBalance = updatedFromAccount.balance;
  });

  return {
    message: 'Transaction successful',
    balance: fromAccountBalance
  };
};

export const withdrawFunds = async (accountId: number, amount: number): Promise<{ message: string, balance: number }> => {
  const account = await knex('accounts').where({ id: accountId }).select('balance').first();
  
  if (!account) {
    throw new Error(`Account with id ${accountId} not found`);
  }

  if (account.balance < amount) {
    throw new Error('Insufficient balance');
  }

  await knex('accounts')
    .where({ id: accountId })
    .decrement('balance', amount);

  const updatedAccount = await knex('accounts')
    .where({ id: accountId })
    .select('balance')
    .first();

  if (!updatedAccount) {
    throw new Error(`Failed to update account ${accountId}`);
  }

  return {
    message: 'Transaction successful',
    balance: updatedAccount.balance
  };
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
    throw new Error("ADJUTOR_API_KEY is not set in the environment variables");
  }

  const response = await fetch(
    `https://adjutor.lendsqr.com/verification/karma/${email}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  const result: AdjutorResponse = await response.json();

  return (
    result.status !== "success" ||
    !result.message.includes("not found in karma")
  );
};