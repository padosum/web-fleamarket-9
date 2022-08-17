import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({
    example: 1,
    description: '카테고리 인덱스',
    required: true,
  })
  readonly id: number;

  @ApiProperty({
    example: '생활가전',
    description: '카테고리 이름',
    required: true,
  })
  readonly name: string;
}
