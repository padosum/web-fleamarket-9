import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CategoryResponseDto } from './dto/category-response.dto';

@Controller('category')
@ApiTags('Category API')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({
    summary: 'category 조회 API',
    description: 'category를 조회한다.',
  })
  @ApiResponse({
    type: [CategoryResponseDto],
    description: 'success',
    status: 200,
  })
  @Get()
  findAll(): Promise<CategoryResponseDto> {
    return this.categoryService.findAll();
  }
}
