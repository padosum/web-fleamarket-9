import { ApiProperty } from '@nestjs/swagger';

export class UpdateItemStatusDto {
  @ApiProperty({
    example: 1,
    description: 'item status id',
    required: true,
  })
  readonly statusId: number;
}
