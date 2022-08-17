import { ApiProperty } from '@nestjs/swagger';

export class UpdateItemResponseSuccessDto {
  @ApiProperty({
    example: 1,
    description: 'item id',
    required: true,
  })
  readonly id: number;
}

export class UpdateItemResponseFailDto {
  @ApiProperty({
    example: '아이템 수정 실패',
    description: '아이템 수정 실패 메시지',
    required: true,
  })
  readonly message: string;
}
