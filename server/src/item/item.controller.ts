import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { FindItemsDto } from './dto/find-items.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateItemResponseFailDto,
  CreateItemResponseSuccessDto,
} from './dto/create-item-response.dto';
import {
  GetItemResponseFailDto,
  GetItemResponseSuccessDto,
} from './dto/get-item-response.dto';
import {
  DeleteItemResponseFailDto,
  DeleteItemResponseSuccessDto,
} from './dto/delete-item-response.dto';
import {
  UpdateItemResponseFailDto,
  UpdateItemResponseSuccessDto,
} from './dto/update-item-response.dto';

@Controller('item')
@ApiTags('Item API')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiOperation({
    summary: 'item 추가 API',
    description: 'item을 추가한다.',
  })
  @ApiResponse({
    type: CreateItemResponseSuccessDto,
    description: 'success',
    status: 200,
  })
  @ApiResponse({
    type: CreateItemResponseFailDto,
    description: 'fail',
    status: 400,
  })
  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @ApiOperation({
    summary: 'item 전체 조회 API',
    description: 'item을 전체 조회한다.',
  })
  @ApiResponse({
    type: [FindItemsDto],
    description: 'success',
    status: 200,
  })
  @Get()
  findAll(
    @Query('categoryId') categoryId: number,
    @Query('locationId') locationId: number,
  ): FindItemsDto {
    return this.itemService.findAll(categoryId, locationId);
  }

  @ApiOperation({
    summary: 'item 조회 API',
    description: '특정 item을 조회한다.',
  })
  @ApiResponse({
    type: GetItemResponseSuccessDto,
    description: 'success',
    status: 200,
  })
  @ApiResponse({
    type: GetItemResponseFailDto,
    description: 'fail',
    status: 400,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id);
  }

  @ApiOperation({
    summary: 'item 업데이트 API',
    description: '특정 item을 조회한다.',
  })
  @ApiResponse({
    type: UpdateItemResponseSuccessDto,
    description: 'success',
    status: 200,
  })
  @ApiResponse({
    type: UpdateItemResponseFailDto,
    description: 'fail',
    status: 400,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(+id, updateItemDto);
  }

  @ApiOperation({
    summary: 'item 삭제 API',
    description: '특정 item을 삭제한다.',
  })
  @ApiResponse({
    type: DeleteItemResponseSuccessDto,
    description: 'success',
    status: 200,
  })
  @ApiResponse({
    type: DeleteItemResponseFailDto,
    description: 'fail',
    status: 400,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }
}
