import express from 'express';
import { registerController } from '../Controllers';

const router = express.Router();

router.post('/register', registerController.register);

export default router;
