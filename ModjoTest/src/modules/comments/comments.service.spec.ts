import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './comments.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comments.entity';
import { Call } from '../calls/calls.entity';
import { HttpModule } from '@nestjs/common';
import { PipedriveService } from '../pipedrive/pipedrive.service';

describe('CatService', () => {
  let service: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Comment, Call]), HttpModule],
      providers: [CommentsService, PipedriveService],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getAll', () => {
    it('should return the array of comments', async () => {
      const comments = await service.getComments();
      expect(comments.length).toBe(4);
      expect(comments[0]).toEqual({
        id: 1,
        message: 'this is a test',
        timestamp: '2021-06-01 18:06:28.736',
        callId: 1,
      });
      expect(comments[1].message).toBe('this is a test');
    });
  });
  describe('addComment', () => {
    it('should add the comment', () => {
      const commentDTO: CreateCommentDto = {
        message: 'add comment on comment.service.spec',
        timestamp: new Date('2021-06-02T20:36:02.087Z'),
        callId: 1,
      };
      const newComment = service.createComment(commentDTO);
      expect(newComment).toEqual({ id: 4, ...commentDTO });
    });
  });
});
