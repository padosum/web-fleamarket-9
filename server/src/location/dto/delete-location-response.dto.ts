import { ApiProperty } from '@nestjs/swagger';

export class DeleteLocationResponseSuccessDto {
  @ApiProperty({
    example: 1,
    description: '삭제된 동네 수',
    required: true,
  })
  readonly count: number;
}

export class DeleteLocationResponseFailDto {
  @ApiProperty({
    example: '권한이 없는 location입니다.',
    description: 'location 삭제 실패 메시지',
    required: true,
  })
  readonly message: string;
}
