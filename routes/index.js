import express from 'express';
import { registerController, loginController } from '../Controllers';

const router = express.Router();

router.post('/register', registerController.register);
router.post('/login', loginController.login);

export default router;
