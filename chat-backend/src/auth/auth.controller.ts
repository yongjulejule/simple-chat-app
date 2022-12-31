import {
  Body,
  Controller,
  Header,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UnauthorizedFilter } from './filters/unauthorized.filter';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOkResponse({ description: 'Login successful' })
  @ApiUnauthorizedResponse({ description: 'Login failed' })
  @ApiBody({ type: LoginUserDto })
  @ApiBearerAuth('access_token')
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) /* : Promise<LoginUserDto> */ {
    const { access_token } = await this.authService.login(req.user);
    res.status(200).setHeader('Authorization', `Bearer ${access_token}`);
    // res.cookie('access_token', access_token, {
    //   sameSite: 'lax',
    //   httpOnly: true,
    // });
    // return req.user;
    return;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: LoginUserDto })
  @ApiOkResponse({ description: 'Logout successful' })
  @Post('logout')
  getProfile(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    console.log('profile', req.user);
    // res.cookie('access_token', '', {
    //   expires: new Date(0),
    //   httpOnly: true,
    // });
    return req.user;
  }
}
