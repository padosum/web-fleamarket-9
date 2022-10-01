import { ApiProperty } from '@nestjs/swagger';

export class ConvertImageResponseDto {
  @ApiProperty({
    description: '변환된 base64',
  })
  readonly base64: string;
}
