import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  timestamp: Date;

  @ApiProperty()
  @IsNumber()
  callId: number;
}
