import { Injectable } from '@nestjs/common';
import { CategoryResponseDto } from './dto/category-response.dto';

@Injectable()
export class CategoryService {
  findAll(): CategoryResponseDto {
    return;
  }
}
