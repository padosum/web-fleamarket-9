import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class ImageService {
  constructor(private configService: ConfigService) {}
  async uploadFile(file) {
    AWS.config.update({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });

    try {
      const Key = `${Date.now() + file.originalname}`;
      await new AWS.S3()
        .putObject({
          Key,
          Body: file.buffer,
          Bucket: this.configService.get<string>('AWS_S3_BUCKET_NAME'),
        })
        .promise();

      const url = this.configService.get<string>('AWS_S3_URL_HOST') + Key;
      return { url };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
