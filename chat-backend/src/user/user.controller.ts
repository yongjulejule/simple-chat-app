import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from './validation/validation.pipe';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseInterceptors(LoggerInterceptor)
  @Post()
  async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Success', type: CreateUserDto })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
