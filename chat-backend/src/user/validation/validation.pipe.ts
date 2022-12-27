import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
	async transform(value: any, { metatype }: ArgumentMetadata) {
		if (!metatype) {
			return value;
		}
		const object = plainToInstance(metatype, value);
		const errors = await validate(object);
		console.log(errors);
		if (errors.length > 0) {
			throw new BadRequestException(`${errors[0].constraints[Object.keys(errors[0].constraints)[0]]}`);
		}
		return value;
	}

}
