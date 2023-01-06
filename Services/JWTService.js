import { JWT_SECRET } from '../Config';
import Jwt from 'jsonwebtoken';
class JwtService {
  static sign(payload, expire = '6000s', secret = JWT_SECRET) {
    return Jwt.sign(payload, secret, { expiresIn: expire });
  }
  static verify(token, secret = JWT_SECRET) {
    return Jwt.verify(token, secret);
  }
}

export default JwtService;
