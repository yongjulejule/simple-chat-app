import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
    console.log('JwtAuthGuard constructor called');
  }

  handleRequest(err, user, info) {
    console.log('JwtAuthGuard handleRequest called');
    console.log('err : ', err);
    console.log('user : ', user);
    console.log('info : ', info);

    return user;
  }
}
