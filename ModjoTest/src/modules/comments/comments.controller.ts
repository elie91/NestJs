import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './comments.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentsService: CommentsService) {}

  /** Create a comment in database with this endpoint */
  @Post()
  async createComment(@Body() dto: CreateCommentDto) {
    return await this.commentsService.createComment(dto);
  }

  /** List all comments in database with this endpoint */
  @Get()
  async getComments() {
    return await this.commentsService.getComments();
  }

  /** Push a comment to pipedrive */
  @Post(':id/pipedrive')
  async pushComment(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return await this.commentsService.pushComment(id);
  }
}
