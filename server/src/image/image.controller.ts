import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import axios from 'axios';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConvertImageRequestDto } from './dto/convert-image.dto';
import { ImageResponseDto } from './dto/image-response.dto';
import { ImageService } from './image.service';
import { ConvertImageResponseDto } from './dto/convert-image-response.dto';

@Controller('image')
@ApiTags('Image Upload API')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @ApiOperation({
    summary: 'image 업로드',
    description: 'image를 AWS S3에 업로드하고 이미지 url을 반환한다.',
  })
  @ApiResponse({
    type: ImageResponseDto,
    description: 'success',
    status: 200,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ImageResponseDto> {
    return this.imageService.uploadFile(file);
  }

  @ApiOperation({
    summary: 'image url을 base64로 변경',
    description: 'image url을 base64로 변경한다.',
  })
  @ApiResponse({
    type: ConvertImageResponseDto,
    description: 'success',
    status: 200,
  })
  @Post('/convert')
  async converUrlToBase64(
    @Body() urlDto: ConvertImageRequestDto,
  ): Promise<ConvertImageResponseDto> {
    const image = await axios.get(urlDto.url, {
      responseType: 'arraybuffer',
    });
    const returnedB64 = Buffer.from(image.data).toString('base64');

    return { base64: returnedB64 };
  }
}
