import { JWT_SECRET } from '../Config';
import Jwt from 'jsonwebtoken';
class JwtService {
  static sign(payload, expire = '60s', secret = JWT_SECRET) {
    return Jwt.sign(payload, secret, { expiresIn: expire });
  }
}

export default JwtService;
