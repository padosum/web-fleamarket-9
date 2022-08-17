import { ApiProperty } from '@nestjs/swagger';

export class CreateChatRoomResponseDto {
  @ApiProperty({
    example: 1,
    description: 'chat room id',
    required: true,
  })
  readonly chatId: number;
}
