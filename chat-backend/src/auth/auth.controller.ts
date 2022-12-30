import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { access_token } = await this.authService.login(req.user);
    res.cookie('access_token', access_token, {
      sameSite: 'lax',
      httpOnly: true,
    });
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  getProfile(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    console.log('profile', req.user);
    res.cookie('access_token', '', {
      expires: new Date(0),
      httpOnly: true,
    });
    return req.user;
  }
}
