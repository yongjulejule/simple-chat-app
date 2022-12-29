import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Encrypter } from '../../lib/encrypter';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private readonly encrypter: Encrypter) {}
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException(
        `${errors[0].constraints[Object.keys(errors[0].constraints)[0]]}`,
      );
    }
    object.password = await new Encrypter().hashPassword(object.password);
    return object;
  }
}
