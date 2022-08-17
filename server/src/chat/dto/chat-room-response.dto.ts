import { ApiProperty } from '@nestjs/swagger';

export class ChatRoomResponseDto {
  @ApiProperty({
    example: 1,
    description: 'chat room idx',
    required: true,
  })
  readonly idx: number;

  @ApiProperty({
    example: 'user1',
    description: '상대방 user의 이름',
    required: true,
  })
  readonly userName: string;

  @ApiProperty({
    example: '얼마인가요?',
    description: '마지막 메시지',
    required: true,
  })
  readonly message: string;

  @ApiProperty({
    example: '2022.08.17',
    description: '마지막 메시지 전송 날짜',
    required: true,
  })
  readonly updatedAt: string;

  @ApiProperty({
    example: 'http://image.com',
    description: 'item 이미지',
    required: true,
  })
  readonly image: string;

  @ApiProperty({
    example: 2,
    description: '읽지 않은 메시지 수',
    required: true,
  })
  readonly unReadCount: number;
}
