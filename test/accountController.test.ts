import { jest } from '@jest/globals';
import { Request, Response } from 'express';
import {
  createAccountController,
  fundAccountController,
  transferFundsController,
  withdrawFundsController,
} from '../src/controllers/accountController.js';
import * as accountModel from '../src/models/account.js';

// Mock the account model
jest.mock('../src/models/account.js');

// Mock the database
jest.mock('../src/utils/database', () => ({
  __esModule: true,
  default: {
    select: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    first: jest.fn().mockResolvedValue({}),
    insert: jest.fn().mockResolvedValue([1]),
    update: jest.fn().mockResolvedValue(1),
    del: jest.fn().mockResolvedValue(1),
  },
}));

describe('Account Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    req = {
      body: {},
    };
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnThis();
    res = {
      json: jsonMock,
      status: statusMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new account', async () => {
    const mockAccount = { id: 1, userId: 'user123', balance: 1000, name: 'Test User', email: 'test@example.com' };
    (accountModel.isBlacklisted as jest.Mock).mockResolvedValue(false);
    (accountModel.createAccount as jest.Mock).mockResolvedValue(mockAccount);

    req.body = { email: 'test@example.com', userId: 'user123', initialDeposit: 1000 };

    await createAccountController(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith(mockAccount);
  });

  it('should return 403 if user is blacklisted', async () => {
    (accountModel.isBlacklisted as jest.Mock).mockResolvedValue(true);

    req.body = { email: 'blacklisted@example.com' };

    await createAccountController(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(403);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'User is blacklisted' });
  });

  it('should fund an account', async () => {
    const mockAccount = { id: 1, userId: 'user123', balance: 2000, name: 'Test User', email: 'test@example.com' };
    (accountModel.fundAccount as jest.Mock).mockResolvedValue(mockAccount);

    req.body = { accountId: 1, amount: 1000 };

    await fundAccountController(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(mockAccount);
  });

  it('should transfer funds between accounts', async () => {
    (accountModel.transferFunds as jest.Mock).mockResolvedValue(undefined);

    req.body = { fromAccountId: 1, toAccountId: 2, amount: 500 };

    await transferFundsController(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Transfer successful' });
  });

  it('should withdraw funds from an account', async () => {
    const mockAccount = { id: 1, userId: 'user123', balance: 500, name: 'Test User', email: 'test@example.com' };
    (accountModel.withdrawFunds as jest.Mock).mockResolvedValue(mockAccount);

    req.body = { accountId: 1, amount: 500 };

    await withdrawFundsController(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(mockAccount);
  });
});