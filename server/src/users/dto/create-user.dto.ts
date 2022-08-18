import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'user1',
    description: 'user 아이디',
    required: true,
  })
  readonly id: string;

  @ApiProperty({
    example: 'a12345',
    description: 'user 비밀번호',
    required: true,
  })
  readonly password: string;

  @ApiProperty({
    example: '홍길동',
    description: 'user 이름',
    required: true,
  })
  readonly name: string;
}
