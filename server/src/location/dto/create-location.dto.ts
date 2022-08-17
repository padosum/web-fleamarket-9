import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty({
    example: 1,
    description: 'locationId',
    required: true,
  })
  readonly locationId: number;
}
