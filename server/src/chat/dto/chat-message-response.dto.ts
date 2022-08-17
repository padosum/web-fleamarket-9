import { ApiProperty } from '@nestjs/swagger';

export class ChatMessageResponseDto {
  @ApiProperty({
    example: 1,
    description: 'message를 보낸 사람 id',
    required: true,
  })
  readonly sender: number;

  @ApiProperty({
    example: '안녕하세요',
    description: 'message 내용',
    required: true,
  })
  readonly message: string;

  @ApiProperty({
    example: false,
    description: 'message 읽음 여부',
    required: true,
  })
  readonly read: boolean;
}
