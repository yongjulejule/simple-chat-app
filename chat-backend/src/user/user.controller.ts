import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from './validation/validation.pipe';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UnauthorizedFilter } from '../auth/filters/unauthorized.filter';

@ApiTags('user')
@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseInterceptors(LoggerInterceptor)
  @Post()
  async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    const res = await this.userService.create(createUserDto);
    return 'user created';
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseFilters(UnauthorizedFilter)
  @ApiResponse({ status: 200, description: 'Success', type: CreateUserDto })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseFilters(UnauthorizedFilter)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseFilters(UnauthorizedFilter)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
