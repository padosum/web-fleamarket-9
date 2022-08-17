import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseSuccessDto {
  @ApiProperty({
    example: '홍길동',
    description: 'user 이름',
    required: true,
  })
  readonly name: string;
}

export class LoginResponseFailDto {
  @ApiProperty({
    example: '존재하지 않는 아이디입니다.',
    description: '로그인 실패 메시지',
    required: true,
  })
  readonly message: string;
}
