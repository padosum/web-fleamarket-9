import { ApiProperty } from '@nestjs/swagger';

export class DeleteItemResponseSuccessDto {
  @ApiProperty({
    example: 1,
    description: '삭제된 item id',
    required: true,
  })
  readonly id: number;
}

export class DeleteItemResponseFailDto {
  @ApiProperty({
    example: '권한이없는 item입니다.',
    description: 'item 삭제 실패 메시지',
    required: true,
  })
  readonly message: string;
}
