import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CommentsService } from '../src/modules/comments/comments.service';
import { CommentController } from '../src/modules/comments/comments.controller';

describe('CommentController (e2e)', () => {
  let app: INestApplication;
  const commentService = {
    getComments: () => [
      {
        id: 1,
        callId: 2,
        message: 'this is a test',
        timestamp: '2021-06-01T18:06:28.736Z',
      },
      {
        id: 2,
        callId: 1,
        message: 'this is a test comment',
        timestamp: '2021-06-02T20:36:02.087Z',
      },
    ],
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [CommentsService],
    })
      .overrideProvider(CommentsService)
      .useValue(CommentsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET comments`, () => {
    return request(app.getHttpServer()).get('/comments').expect(200).expect({
      data: commentService.getComments(),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
