import { Injectable, Logger } from '@nestjs/common';
import { Encrypter } from '../lib/encrypter';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginPayload } from './auth.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private userService: UserService,
    private encrypter: Encrypter,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    user
      ? this.logger.log('email : ', email, 'is exist')
      : this.logger.log('email : ', email, 'is not exist');
    if (user && (await this.encrypter.comparePassword(pass, user.password))) {
      const { id, email } = user;
      return { id, email };
    }
    return null;
  }

  async login(user: any): Promise<LoginPayload> {
    this.logger.log('AuthService.login() called');
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      email: user.email,
    };
  }
  logout() {
    return 'Logout success';
  }
}
