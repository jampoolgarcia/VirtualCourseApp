// Uncomment these imports to begin using these cool features!

import {repository} from '@loopback/repository';
import {HttpErrors, post, requestBody} from '@loopback/rest';
import {UserRepository} from '../repositories';
import {AuthService} from '../services/auth.service';


// import {inject} from '@loopback/core';

class credencials {
  userName: string;
  password: string;
}

export class UserController {

  authService: AuthService;

  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository
  ) {
    this.authService = new AuthService(userRepository);
  }


  @post("/login", {
    responses: {
      '200': {
        description: "Login for user"
      }

    }
  })
  async login(
    @requestBody() credencials: credencials
  ): Promise<Object> {
    let user = await this.authService.Identify(credencials.userName, credencials.password);
    if (user) {
      let tk = await this.authService.generateToken(user);
      return {
        data: user,
        token: tk
      }
    } else {
      throw new HttpErrors[401]("User or password invalid.");
    }
  }


}
