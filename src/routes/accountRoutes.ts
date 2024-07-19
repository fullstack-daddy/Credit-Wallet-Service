import { Router } from 'express';
import { createAccountController, fundAccountController, transferFundsController, withdrawFundsController } from '../controllers/accountController';
import { signupController, loginController } from '../controllers/authController';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.post('/signup', signupController);
router.post('/login', loginController);

router.post('/accounts', authenticateToken, createAccountController);
router.post('/accounts/fund', authenticateToken, fundAccountController);
router.post('/accounts/transfer', authenticateToken, transferFundsController);
router.post('/accounts/withdraw', authenticateToken, withdrawFundsController);

export default router;