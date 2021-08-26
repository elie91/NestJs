import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CallController } from './calls.controller';
import { Call } from './calls.entity';
import { CallService } from './calls.service';

@Module({
  imports: [TypeOrmModule.forFeature([Call])],
  controllers: [CallController],
  providers: [CallService],
})
export class CallModule {}
