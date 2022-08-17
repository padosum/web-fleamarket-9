import { ApiProperty } from '@nestjs/swagger';

export class DeleteLocationResponseSuccessDto {
  @ApiProperty({
    example: 1,
    description: '삭제된 location id',
    required: true,
  })
  readonly id: number;
}

export class DeleteLocationResponseFailDto {
  @ApiProperty({
    example: '권한이없는 location입니다.',
    description: 'location 삭제 실패 메시지',
    required: true,
  })
  readonly message: string;
}
