import { ApiProperty } from '@nestjs/swagger';

export class FindLocationResponse {
  @ApiProperty({
    example: 1,
    description: '동네 index',
    required: true,
  })
  readonly idx: number;

  @ApiProperty({
    example: '방이동',
    description: '동네이름',
    required: true,
  })
  readonly name: string;

  @ApiProperty({
    example: '1101',
    description: '동네 코드',
    required: true,
  })
  readonly code: string;
}
