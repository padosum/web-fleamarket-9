import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({
    example: '파랑 선풍기',
    description: 'item 이름',
    required: true,
  })
  readonly title: string;

  @ApiProperty({
    example: ['http://image.com'],
    description: 'item 이미지 url 배열',
    required: true,
  })
  readonly images: string[];

  @ApiProperty({
    example: 10000,
    description: 'item 가격',
    required: true,
  })
  readonly price: number;

  @ApiProperty({
    example: '판매합니다...',
    description: 'item 설명',
    required: true,
  })
  readonly contents: string;

  @ApiProperty({
    example: '110101',
    description: 'item 판매 동네',
    required: true,
  })
  readonly code: string;

  @ApiProperty({
    example: 1,
    description: 'item category 아이디',
    required: true,
  })
  readonly category: number;

  @ApiProperty({
    example: 1,
    description: '동네 index',
    required: true,
  })
  readonly locationId: number;
}
