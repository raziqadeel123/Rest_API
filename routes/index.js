import express from 'express';
import {
  registerController,
  loginController,
  userController,
  refreshTokenfController,
  productController,
} from '../Controllers';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.get('/getuser', auth, userController.getUser);
router.post('/refreshToken', refreshTokenfController.refreshToken);
router.post('/logout', auth, loginController.logout);
router.post('/products', productController.createProduct);

export default router;
