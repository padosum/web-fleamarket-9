import { ApiProperty } from '@nestjs/swagger';

export class UpdateItemLikeResponseSuccessDto {
  @ApiProperty({
    example: 1,
    description: 'item id',
    required: true,
  })
  readonly id: number;

  @ApiProperty({
    example: true,
    description: 'item like 여부',
    required: true,
  })
  readonly like: boolean;
}
