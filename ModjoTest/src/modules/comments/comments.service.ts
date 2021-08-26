import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comments.entity';
import { CreateCommentDto } from './comments.dto';
import { Call } from '../calls/calls.entity';
import { PipedriveService } from '../pipedrive/pipedrive.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Call)
    private readonly callsRepository: Repository<Call>,
    private readonly pipedriveService: PipedriveService,
  ) {}

  async createComment(dto: CreateCommentDto) {
    const call = await this.callsRepository.findOne(dto.callId);
    if (!call) {
      throw new NotFoundException('Call not found');
    }
    const comment = { ...dto, call };
    return await this.commentRepository.save(comment);
  }

  async getComments() {
    return await this.commentRepository.find();
  }

  async pushComment(id: number) {
    const comment = await this.commentRepository.findOne(id, {
      relations: ['call'],
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    const crmActivityId = comment.call.crmActivityId;
    if (!crmActivityId) {
      throw new NotFoundException(
        'the call related to the comment does not have an crmActivityId ',
      );
    }
    try {
      const activity = await this.pipedriveService.getActivity(+crmActivityId);
      const updated_note = activity.note + '<br>' + comment.message;
      return this.pipedriveService.updateActivity(+crmActivityId, {
        note: updated_note,
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
