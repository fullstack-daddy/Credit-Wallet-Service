import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import { Request, Response } from 'express';
import {
  createAccountController,
  fundAccountController,
  transferFundsController,
  withdrawFundsController,
} from '../src/controllers/accountController';
import * as accountModel from '../src/models/account';

describe('Account Controller', () => {
  let req: Partial<Request>;
  let res: {
    status?: SinonStub;
    json?: SinonStub;
  };

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create a new account', async () => {
    const mockAccount = { id: 1, userId: 'user123', balance: 1000, name: 'Test User', email: 'test@example.com' };
    sinon.stub(accountModel, 'isBlacklisted').resolves(false);
    sinon.stub(accountModel, 'createAccount').resolves(mockAccount);

    req.body = { email: 'test@example.com', userId: 'user123', initialDeposit: 1000 };

    await createAccountController(req as Request, res as unknown as Response);

    expect(res.status?.calledWith(201)).to.be.true;
    expect(res.json?.calledWith(mockAccount)).to.be.true;
  });

  it('should return 403 if user is blacklisted', async () => {
    sinon.stub(accountModel, 'isBlacklisted').resolves(true);

    req.body = { email: 'blacklisted@example.com' };

    await createAccountController(req as Request, res as unknown as Response);

    expect(res.status?.calledWith(403)).to.be.true;
    expect(res.json?.calledWith({ message: 'User is blacklisted' })).to.be.true;
  });

  it('should fund an account', async () => {
    const mockAccount = { id: 1, userId: 'user123', balance: 2000, name: 'Test User', email: 'test@example.com' };
    sinon.stub(accountModel, 'fundAccount').resolves(mockAccount);

    req.body = { accountId: 1, amount: 1000 };

    await fundAccountController(req as Request, res as unknown as Response);

    expect(res.status?.calledWith(200)).to.be.true;
    expect(res.json?.calledWith(mockAccount)).to.be.true;
  });

  it('should transfer funds between accounts', async () => {
    req.body = { fromAccountId: 1, toAccountId: 2, amount: 500 };

    await transferFundsController(req as Request, res as unknown as Response);

    expect(res.status?.calledWith(200)).to.be.true;
    expect(res.json?.calledWith({ message: 'Transfer successful' })).to.be.true;
  });

  it('should withdraw funds from an account', async () => {
    const mockAccount = { id: 1, userId: 'user123', balance: 500, name: 'Test User', email: 'test@example.com' };
    sinon.stub(accountModel, 'withdrawFunds').resolves(mockAccount);

    req.body = { accountId: 1, amount: 500 };

    await withdrawFundsController(req as Request, res as unknown as Response);

    expect(res.status?.calledWith(200)).to.be.true;
    expect(res.json?.calledWith(mockAccount)).to.be.true;
  });
});
