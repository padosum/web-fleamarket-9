import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty({
    example: 'user1',
    description: 'item 판매자 id',
    required: true,
  })
  readonly sellerId: string;

  @ApiProperty({
    example: 1,
    description: 'item id',
    required: true,
  })
  readonly itemId: number;
}
