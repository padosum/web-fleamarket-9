import { ApiProperty } from '@nestjs/swagger';

export class GetUserResponseSuccessDto {
  @ApiProperty({
    example: 'baemin',
    description: 'user id',
    required: true,
  })
  readonly id: string;

  @ApiProperty({
    example: '홍길동',
    description: 'user 이름',
    required: true,
  })
  readonly name: string;
}

export class GetUserResponseFailDto {
  @ApiProperty({
    example: '로그인하지 않았습니다',
    description: '정보조회 실패 메시지',
    required: true,
  })
  readonly message: string;
}
