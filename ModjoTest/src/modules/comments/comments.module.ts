import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comments.controller';
import { Comment } from './comments.entity';
import { CommentsService } from './comments.service';
import { Call } from '../calls/calls.entity';
import { PipedriveService } from '../pipedrive/pipedrive.service';

/**
 * TODO
 * You will probably need to add providers and/or imports to this module in order to complete your task
 */
@Module({
  imports: [TypeOrmModule.forFeature([Comment, Call]), HttpModule],
  controllers: [CommentController],
  providers: [CommentsService, PipedriveService],
})
export class CommentModule {}
