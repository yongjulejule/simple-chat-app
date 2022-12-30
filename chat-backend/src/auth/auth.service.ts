import { Injectable } from '@nestjs/common';
import { Encrypter } from '../lib/encrypter';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private encrypter: Encrypter,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    user
      ? console.log('email : ', email, 'is authenticated')
      : console.log('email : ', email, 'is not authenticated');
    console.log(pass, user.password);
    if (user && (await this.encrypter.comparePassword(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log('AuthService.login() called');
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
