import { ApiProperty } from '@nestjs/swagger';

export class CreateItemResponseSuccessDto {
  @ApiProperty({
    example: 1,
    description: 'item id',
    required: true,
  })
  readonly id: number;
}

export class CreateItemResponseFailDto {
  @ApiProperty({
    example: '아이템 추가 실패',
    description: '아이템 추가 실패 메시지',
    required: true,
  })
  readonly message: string;
}
