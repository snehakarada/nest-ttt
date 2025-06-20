import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Redirect } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/enter (POST)', () => {
    return request(app.getHttpServer())
      .post('/enter')
      .send({ playerName: 'superMan' })
      .expect(302)
      .expect('location', '/waitingPage.html')
  });

  it('/enter (POST)', async () => {
    await request(app.getHttpServer())
      .post('/enter')
      .send({ playerName: 'SuperMan' })

    await request(app.getHttpServer())
      .post('/enter')
      .send({ playerName: 'IronMan' })
      .expect(302)
      .expect("location", "/gamePage.html")
  })
});
