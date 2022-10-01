import { ApiProperty } from '@nestjs/swagger';

export class ConvertImageRequestDto {
  @ApiProperty({
    example: 'https://aws.com/image.png',
    description: '업로드된 이미지 url',
    required: true,
  })
  readonly url: string;
}
