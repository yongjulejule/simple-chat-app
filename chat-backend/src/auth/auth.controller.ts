import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UnauthorizedFilter } from './filters/unauthorized.filter';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginPayload } from './auth.interface';
import { LoginInterceptor } from './interceptors/login.interceptor';
import { LogoutInterceptor } from './interceptors/logout.interceptor';

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
  @UseInterceptors(LoginInterceptor)
  async login(@Req() req: Request): Promise<LoginPayload> {
    return await this.authService.login(req.user);
  }

  @ApiBody({ type: LoginUserDto })
  @ApiOkResponse({ description: 'Logout success' })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(LogoutInterceptor)
  logout(): string {
    return this.authService.logout();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'verified' })
  @Get('verification')
  @HttpCode(HttpStatus.OK)
  @UseFilters(UnauthorizedFilter)
  verify(@Req() req: Request) {
    console.log('res.user: ', req.user);
    return req.user;
  }
}
