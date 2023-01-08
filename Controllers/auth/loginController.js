import Joi from 'joi';
import JwtService from '../../Services/JWTService';
import { User, RefreshToken } from '../../models';
import bcrypt from 'bcrypt';
import CustomErrorHandler from '../../Services/CustomErrorHandler';
import { REFRESH_SECRET } from '../../Config';
const loginController = {
  async login(req, res, next) {
    // validation
    const LoginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    });

    const { error } = LoginSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return next(CustomErrorHandler.wrongCredentials());
      }
      // compare the password
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return next(CustomErrorHandler.wrongCredentials());
      }

      // Token
      const access_token = JwtService.sign({
        _id: user._id,
        role: user.role,
      });

      const refresh_token = JwtService.sign(
        { _id: user._id, role: user.role },
        '1y',
        REFRESH_SECRET
      );

      // database refreshtoken whitelist

      await RefreshToken.create({ token: refresh_token });

      res.json({ access_token, refresh_token });
    } catch (err) {
      return next(err);
    }
  },

  async logout(req, res, next) {
    // request validation
    const refreshTokenSchema = Joi.object({
      refreshToken: Joi.string().required(),
    });

    const { error } = refreshTokenSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    try {
      await RefreshToken.deleteOne({ token: req.body.refresh_token });
    } catch (err) {
      retrun(new Error('Something went wrong in the database'));
    }
    res.json({ status: 1 });
  },
};

export default loginController;
