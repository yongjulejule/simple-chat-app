import { IsString } from 'class-validator';

export class CheckUserDto {
  @IsString()
  email: string;
  @IsString()
  password: string;
}
