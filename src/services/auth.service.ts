import {repository} from '@loopback/repository';
import {ServiceKeys} from '../keys/service-keys';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {EncryptDecrypt} from './encrypt-decrypt.service';
const jwt = require("jsonwebtoken");

export class AuthService {

  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository
  ) {

  }

  async Identify(userName: string, password: string): Promise<User | false> {
    let user = await this.userRepository.findOne({where: {userName: userName}});

    if (user) {
      let passCrypt = new EncryptDecrypt(ServiceKeys.LOGIN_CRYPT_METHOD).Encrypt(password);
      if (user.password == passCrypt) {
        return user;
      }
    }

    return false;
  }

  async generateToken(user: User) {
    let token = jwt.sing({
      exp: ServiceKeys.TOKEN_EXPIRATIONS_TIME,
      data: {
        _id: user.id,
        userName: user.userName,
        role: user.role,
        studentId: user.studentId
      }
    },
      ServiceKeys.JWT_SECRET_KEY);

    return token;
  }

}
