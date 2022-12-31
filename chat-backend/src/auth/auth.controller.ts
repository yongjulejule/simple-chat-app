import {
  Body,
  Controller,
  Header,
  HttpCode,
  HttpStatus,
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
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Login successful' })
  @ApiUnauthorizedResponse({ description: 'Login failed' })
  @ApiBody({ type: LoginUserDto })
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) /* : Promise<LoginUserDto> */ {
    const { access_token } = await this.authService.login(req.user);
    res.setHeader('Authorization', `Bearer ${access_token}`);
    res.cookie('access_token', access_token, {
      sameSite: 'lax',
      httpOnly: true,
    });
    // return req.user;
    return;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: LoginUserDto })
  @ApiOkResponse({ description: 'Logout success' })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    this.authService.logout();
    res.cookie('access_token', '', {
      expires: new Date(0),
      httpOnly: true,
    });
    return res.json({ message: 'Logout success' }).end();
    // console.log('logout', req.user);
    // return this.authService.logout();
  }
}
