import { Request, Response } from 'express';
import {
  createAccount as createAccountModel,
  fundAccount as fundAccountModel,
  transferFunds as transferFundsModel,
  withdrawFunds as withdrawFundsModel,
  isBlacklisted,
  Account,
} from '../models/account';

export const createAccountController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const blacklisted = await isBlacklisted(email);
    if (blacklisted) {
      return res.status(403).json({ message: 'User is blacklisted' });
    }
    const newAccount = await createAccountModel(req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const fundAccountController = async (req: Request, res: Response) => {
  try {
    const { accountId, amount } = req.body;
    const updatedAccount = await fundAccountModel(accountId, amount);
    res.status(200).json(updatedAccount);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const transferFundsController = async (req: Request, res: Response) => {
  try {
    const { fromAccountId, toAccountId, amount } = req.body;
    await transferFundsModel(fromAccountId, toAccountId, amount);
    res.status(200).json({ message: 'Transfer successful' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const withdrawFundsController = async (req: Request, res: Response) => {
  try {
    const { accountId, amount } = req.body;
    const updatedAccount = await withdrawFundsModel(accountId, amount);
    res.status(200).json(updatedAccount);
  } catch (error) {
    res.status(500).json({ error });
  }
};
