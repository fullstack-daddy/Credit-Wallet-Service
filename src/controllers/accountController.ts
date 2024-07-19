import { Request, Response } from "express";
import {
  createAccount as createAccountModel,
  fundAccount as fundAccountModel,
  transferFunds as transferFundsModel,
  withdrawFunds as withdrawFundsModel,
  isBlacklisted,
  Account,
} from "../models/account";

export const createAccountController = async (req: Request, res: Response) => {
  try {
    const { email, name, balance } = req.body;
    const blacklisted = await isBlacklisted(email);
    if (blacklisted) {
      return res.status(403).json({ message: 'User is blacklisted' });
    }
    const newAccount = await createAccountModel({ email, name, balance });
    res.status(201).json(newAccount);
  } catch (error) {
    console.error('Error in createAccountController:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
  }
};


export const fundAccountController = async (req: Request, res: Response) => {
  try {
    const { accountId, amount } = req.body;
    const result = await fundAccountModel(accountId, amount);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in fundAccountController:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
  }
};

export const transferFundsController = async (req: Request, res: Response) => {
  try {
    const { fromAccountId, toAccountId, amount } = req.body;
    const result = await transferFundsModel(fromAccountId, toAccountId, amount);
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
    const { accountId, amount } = req.body;
    const result = await withdrawFundsModel(accountId, amount);
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