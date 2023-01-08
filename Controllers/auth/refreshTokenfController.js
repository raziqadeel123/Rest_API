import Joi from 'joi';
import { REFRESH_SECRET } from '../../Config';
import { RefreshToken, User } from '../../models';
import CustomErrorHandler from '../../Services/CustomErrorHandler';
import JwtService from '../../Services/JWTService';
const refreshTokenfController = {
  async refreshToken(req, res, next) {
    // request validation
    const refreshTokenSchema = Joi.object({
      refreshToken: Joi.string().required(),
    });

    const { error } = refreshTokenSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    // checking in data base
    let refreshToken;
    try {
      refreshToken = await RefreshToken.findOne({
        token: req.body.refreshToken,
      });

      if (!refreshToken) {
        return next(CustomErrorHandler.unAuthorized('Invalid refresh Token'));
      }

      let userId;
      try {
        const { _id } = await JwtService.verify(
          refreshToken.token,
          REFRESH_SECRET
        );

        userId = _id;
      } catch (err) {}

      const user = await User.findOne({ _id: userId });

      if (!user) {
        return next(CustomErrorHandler.unAuthorized('No user Found'));
      }

      // tokens
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
      return next(new Error('Something went wrong' + err.message));
    }
  },
};

export default refreshTokenfController;
