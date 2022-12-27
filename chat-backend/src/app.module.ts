import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { SocketModule } from './socket/socket.module';

@Module({
	imports: [
		UserModule,
		// TODO :  extract argument of TypeOrmModule.forRoot() to one object
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			entities: [User],
			synchronize: true,
		}),
		ConfigModule.forRoot(
			{ envFilePath: './config/.development.env' }
		),
		SocketModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
