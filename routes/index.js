import express from 'express';
import {
  registerController,
  loginController,
  userController,
} from '../Controllers';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.get('/getuser', auth, userController.getUser);

export default router;
