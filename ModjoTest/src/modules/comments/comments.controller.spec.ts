import { CommentController } from './comments.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';

describe('Comment Controller', () => {
  let controller: CommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        {
          provide: CommentsService,
          useValue: {
            getComments: jest.fn().mockReturnValue([
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
            ]),
            createComment: jest.fn().mockReturnValue({
              id: 3,
              callId: 1,
              message: 'jest mock add comment',
              timestamp: '2021-06-02T20:36:02.087Z',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<CommentController>(CommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('getAllComments', () => {
    it('should get the list of comments', async () => {
      const retComments = await controller.getComments();
      expect(typeof retComments).toBe('object');
      expect(retComments).toStrictEqual([
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
      ]);
    });
  });

  describe('createNewComment', () => {
    it('should return a new comment', async () => {
      const returnedComment = await controller.createComment({
        callId: 1,
        message: 'jest mock add comment',
        timestamp: new Date('2021-06-02T20:36:02.087Z'),
      });
      expect(returnedComment.id).toBe(3);
      expect(returnedComment.message).toBe('jest mock add comment');
    });
  });
});
