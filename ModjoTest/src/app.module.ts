import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CallModule } from './modules/calls/calls.module';
import { CommentModule } from './modules/comments/comments.module';

@Module({
  imports: [TypeOrmModule.forRoot(), CallModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
