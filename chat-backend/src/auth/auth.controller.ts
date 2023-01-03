import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UnauthorizedFilter } from './filters/unauthorized.filter';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginPayload } from './auth.interface';

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
  ): Promise<{ email: string }> {
    const { access_token, email }: LoginPayload = await this.authService.login(
      req.user,
    );
    res.setHeader('Authorization', `Bearer ${access_token}`);
    res.cookie('access_token', access_token, {
      maxAge: 1000 * 60 * 60 * 24 * 7 /* 7 days */,
      httpOnly: true,
    });
    return { email };
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
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'verified' })
  @Get('verification')
  @HttpCode(HttpStatus.OK)
  @UseFilters(UnauthorizedFilter)
  verify(@Res({ passthrough: true }) res: any) {
    console.log('verified', res?.user);
    return res.json({ message: 'verified' }).end();
  }
}
