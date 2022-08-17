import { ApiProperty } from '@nestjs/swagger';

export class FindItemsDto {
  @ApiProperty({
    example: 'http://image.com',
    description: 'item image url',
    required: true,
  })
  readonly image: string;

  @ApiProperty({
    example: '파랑 선풍기',
    description: 'item 이름',
    required: true,
  })
  readonly title: string;

  @ApiProperty({
    example: '역삼동',
    description: 'item 동네 이름',
    required: true,
  })
  readonly location: string;

  @ApiProperty({
    example: '2022.08.17',
    description: 'item 마지막 업데이트 날짜',
    required: true,
  })
  readonly updatedAt: string;

  @ApiProperty({
    example: true,
    description: 'item like 여부',
    required: true,
  })
  readonly isLike: boolean;

  @ApiProperty({
    example: 1,
    description: 'item 채팅 룸 수',
    required: true,
  })
  readonly chatRoomCount: number;
}
