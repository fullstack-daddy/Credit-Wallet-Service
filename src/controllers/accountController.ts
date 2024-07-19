import { Request, Response } from "express";
import {
  createAccount as createAccountModel,
  fundAccount as fundAccountModel,
  transferFunds as transferFundsModel,
  withdrawFunds as withdrawFundsModel,
  getAccountByUserId,
  isBlacklisted,
  Account,
} from "../models/account";

export const createAccountController = async (req: Request, res: Response) => {
  try {
    const { name, email, balance } = req.body;
    const userId = req.userId!;

    const blacklisted = await isBlacklisted(email);
    if (blacklisted) {
      return res.status(403).json({ message: 'User is blacklisted' });
    }

    const existingAccount = await getAccountByUserId(userId);
    if (existingAccount) {
      return res.status(400).json({ message: 'User already has an account' });
    }

    const newAccount = await createAccountModel({ name, email, balance, userId });
    res.status(201).json(newAccount);
  } catch (error) {
    console.error('Error in createAccountController:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
  }
};

export const fundAccountController = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const userId = req.userId!;

    const account = await getAccountByUserId(userId);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    const result = await fundAccountModel(account.id!, amount);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in fundAccountController:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
  }
};

export const transferFundsController = async (req: Request, res: Response) => {
  try {
    const { toAccountId, amount } = req.body;
    const userId = req.userId!;

    const fromAccount = await getAccountByUserId(userId);
    if (!fromAccount) {
      return res.status(404).json({ message: 'Account not found' });
    }

    const result = await transferFundsModel(fromAccount.id!, toAccountId, amount);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in transferFundsController:', error);
    if (error instanceof Error && error.message === 'Insufficient balance') {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
    }
  }
};

export const withdrawFundsController = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const userId = req.userId!;

    const account = await getAccountByUserId(userId);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    const result = await withdrawFundsModel(account.id!, amount);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in withdrawFundsController:', error);
    if (error instanceof Error && error.message === 'Insufficient balance') {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
    }
  }
};