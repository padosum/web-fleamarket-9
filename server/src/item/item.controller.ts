import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { FindItemsDto } from './dto/find-items.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
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
import {
  UpdateItemStatusResponseFailDto,
  UpdateItemStatusResponseSuccessDto,
} from './dto/update-item-status-response.dto';
import { UpdateItemStatusDto } from './dto/update-item-status.dto';
import { UpdateItemLikeResponseSuccessDto } from './dto/update-item-like-response.dto';
import { AuthenticatedGuard } from 'src/auth/guard/authenticated.guard';

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
  @UseGuards(new AuthenticatedGuard())
  @Post()
  async create(@Body() createItemDto: CreateItemDto, @Request() req: any) {
    const user = req.user;
    const idx = await this.itemService.create(createItemDto, user.idx);

    return { idx: idx };
  }

  @ApiOperation({
    summary: '내 아이템 제외 조회 API',
    description: '내 아이템을 제외한 item을 전체 조회한다.',
  })
  @ApiResponse({
    type: [FindItemsDto],
    description: 'success',
    status: 200,
  })
  @ApiQuery({
    name: 'categoryId',
    required: false,
  })
  @ApiQuery({
    name: 'locationId',
    required: false,
  })
  @Get()
  async findOtherItems(
    @Req() req: any,
    @Query('categoryId') categoryId?: number,
    @Query('locationId') locationId?: number,
  ): Promise<FindItemsDto[]> {
    const userIdx = req.user?.idx;
    return this.itemService.findOtherItems(userIdx, categoryId, locationId);
  }

  @ApiOperation({
    summary: '내 아이템 조회 API',
    description: '내 아이템을 조회한다.',
  })
  @ApiResponse({
    type: [FindItemsDto],
    description: 'success',
    status: 200,
  })
  @UseGuards(AuthenticatedGuard)
  @Get('/me')
  async findMyItems(@Req() req: any): Promise<FindItemsDto[]> {
    const userIdx = req.user.idx;

    return this.itemService.findMyItems(userIdx);
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
  findItemDetail(@Param('id') id: string) {
    return this.itemService.findItemDetail(+id);
  }

  @ApiOperation({
    summary: 'item 업데이트 API',
    description: '특정 item을 업데이트한다.',
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
    summary: 'item 상태 업데이트 API',
    description: '특정 item의 상태를 업데이트한다.',
  })
  @ApiResponse({
    type: UpdateItemStatusResponseSuccessDto,
    description: 'success',
    status: 200,
  })
  @ApiResponse({
    type: UpdateItemStatusResponseFailDto,
    description: 'fail',
    status: 400,
  })
  @UseGuards(new AuthenticatedGuard())
  @Patch('/status/:id')
  updateStatus(
    @Param('id') id: string,
    @Body() updateItemStatusDto: UpdateItemStatusDto,
    @Request() req: any,
  ) {
    const user = req.user;
    return this.itemService.updateStatus(
      +id,
      updateItemStatusDto.statusId,
      user.idx,
    );
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
  @UseGuards(new AuthenticatedGuard())
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    const user = req.user;

    return this.itemService.remove(+id, user.idx);
  }

  @ApiOperation({
    summary: 'item like API',
    description: '특정 item의 like 업데이트한다.',
  })
  @ApiResponse({
    type: UpdateItemLikeResponseSuccessDto,
    description: 'success',
    status: 200,
  })
  @UseGuards(new AuthenticatedGuard())
  @Patch('/like/:id')
  addLike(@Param('id') id: string, @Request() req: any) {
    const user = req.user;

    return this.itemService.addLike(+id, user.idx);
  }

  @ApiOperation({
    summary: 'item like 업데이트 API',
    description: '특정 item의 like 여부를 업데이트한다.',
  })
  @ApiResponse({
    type: UpdateItemLikeResponseSuccessDto,
    description: 'success',
    status: 200,
  })
  @UseGuards(new AuthenticatedGuard())
  @Patch('/unlike/:id')
  deleteLike(@Param('id') id: string, @Request() req: any) {
    const user = req.user;

    return this.itemService.deleteLike(+id, user.idx);
  }
}
