import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/user/entities/user.entity';

const mockUser = {
  email: 'yongjule@example.com',
  password: 'julejule',
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/api/user CRUD', () => {
    it('/api/user (POST)', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/user')
        .send(mockUser)
        .expect(201)
        .expect('');
      // const test = res.body.id;
      console.log(res.body);
    });

    it('/api/user (GET)', () => {
      return request(app.getHttpServer()).get('/api/user').expect(200);
    });
  });

  let token: string;
  it('/auth/login (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(mockUser)
      .expect(201)
      .expect((res) => {
        token = res.header['set-cookie'][0];
        expect(res.header['set-cookie'][0]).toContain('access_token');
      });
    console.log(token);
  });
});
