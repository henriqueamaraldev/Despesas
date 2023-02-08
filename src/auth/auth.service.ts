
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {


  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }


  async validateUser(email: string, password: string) {

    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {

      delete user.password;

      return user;

    }

    return null;

  }


  async login(user: any) {

    const payload = { email: user.email, sub: user._id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

}
