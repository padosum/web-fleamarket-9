import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty({
    example: 29,
    description: 'item 판매자 id',
    required: true,
  })
  readonly sellerId: number;

  @ApiProperty({
    example: 30,
    description: 'item 구매자 id',
    required: true,
  })
  readonly buyerId: number;

  @ApiProperty({
    example: 1,
    description: 'item id',
    required: true,
  })
  readonly itemId: number;
}
