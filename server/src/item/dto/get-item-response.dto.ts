import { ApiProperty } from '@nestjs/swagger';

export class GetItemResponseSuccessDto {
  @ApiProperty({
    example: ['http://image.com'],
    description: 'item 이미지 url 배열',
    required: true,
  })
  readonly images: string[];

  @ApiProperty({
    example: '전자기기',
    description: 'item category 이름',
    required: true,
  })
  readonly category: number;

  @ApiProperty({
    example: '2022.08.17',
    description: 'item 마지막 업데이트 날짜',
    required: true,
  })
  readonly updatedAt: string;

  @ApiProperty({
    example: '파랑 선풍기',
    description: 'item 이름',
    required: true,
  })
  readonly title: string;

  @ApiProperty({
    example: '판매합니다...',
    description: 'item 설명',
    required: true,
  })
  readonly contents: string;

  @ApiProperty({
    example: 1,
    description: 'item 채팅 룸 수',
    required: true,
  })
  readonly chatRoomCount: number;

  @ApiProperty({
    example: true,
    description: 'item like 여부',
    required: true,
  })
  readonly isLike: boolean;

  @ApiProperty({
    example: 10000,
    description: 'item 가격',
    required: true,
  })
  readonly price: number;

  @ApiProperty({
    example: 2,
    description: 'item 판매자 id',
    required: true,
  })
  readonly seller: number;

  @ApiProperty({
    example: '방이동',
    description: 'item 판매 동네',
    required: true,
  })
  readonly location: string;

  @ApiProperty({
    example: 10,
    description: 'item 조회수',
    required: true,
  })
  readonly viewCount: number;
}

export class GetItemResponseFailDto {
  @ApiProperty({
    example: '로그인하지 않았습니다',
    description: '정보조회 실패 메시지',
    required: true,
  })
  readonly message: string;
}
