import { ApiProperty } from '@nestjs/swagger';

export class LogoutResponseDto {
  @ApiProperty({
    example: '로그기아웃 했습니다.',
    description: '로그아웃 결과 메시지',
    required: true,
  })
  readonly message: string;
}
