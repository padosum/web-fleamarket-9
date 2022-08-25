import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponseSuccessDto {
  @ApiProperty({
    example: 1,
    description: 'user index',
    required: true,
  })
  readonly idx: number;

  @ApiProperty({
    example: 'react',
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

export class CreateUserResponseFailDto {
  @ApiProperty({
    example: '중복된 아이디입니다.',
    description: '회원가입 실패 메시지',
    required: true,
  })
  readonly message: string;
}
