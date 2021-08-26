import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCallDto } from './calls.dto';
import { CallService } from './calls.service';

@ApiTags('calls')
@Controller('calls')
export class CallController {
  constructor(private readonly callService: CallService) {}

  /** Create a call in database with this endpoint */
  @Post()
  async createCall(@Body() dto: CreateCallDto) {
    return await this.callService.createCall(dto);
  }

  /** List all calls in database with this endpoint */
  @Get()
  async getCalls() {
    return await this.callService.getCalls();
  }
}
