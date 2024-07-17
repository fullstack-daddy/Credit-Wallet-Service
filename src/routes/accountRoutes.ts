import { Router } from 'express';
import { createAccountController, fundAccountController, transferFundsController, withdrawFundsController } from '../controllers/accountController';

const router = Router();

router.post('/accounts', createAccountController);
router.post('/accounts/fund', fundAccountController);
router.post('/accounts/transfer', transferFundsController);
router.post('/accounts/withdraw', withdrawFundsController);

export default router;
