import { Module } from '@nestjs/common';
import { PipedriveService } from './pipedrive.service';

@Module({
  providers: [PipedriveService],
  exports: [PipedriveService],
})
export class PipedriveModule {}
