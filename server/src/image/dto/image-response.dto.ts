import { ApiProperty } from '@nestjs/swagger';

export class ImageResponseDto {
  @ApiProperty({
    example: 'https://aws.com/image.png',
    description: '이미지 업로드 url',
    required: true,
  })
  readonly url: string;
}
