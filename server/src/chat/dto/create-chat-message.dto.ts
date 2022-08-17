import { ApiProperty } from '@nestjs/swagger';

export class CreateChatMessageDto {
  @ApiProperty({
    example: '안녕하세요',
    description: '메시지 내용',
    required: true,
  })
  readonly message: string;
}
