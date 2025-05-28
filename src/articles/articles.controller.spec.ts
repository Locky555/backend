import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { disconnect } from 'mongoose';

describe('ArticlesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await disconnect(); 
  });

  it('/articles (POST) 应该能成功提交文章', async () => {
    const res = await request(app.getHttpServer())
      .post('/articles')
      .send({
        title: '测试文章',
        authors: '测试作者',
        abstract: '这是文章摘要',
      })
      .expect(201);

    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('测试文章');
  });
});
