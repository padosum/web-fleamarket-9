import { Injectable, UseGuards } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import {
  DeleteItemResponseFailDto,
  DeleteItemResponseSuccessDto,
} from './dto/delete-item-response.dto';
import { FindItemsDto } from './dto/find-items.dto';
import {
  GetItemResponseFailDto,
  GetItemResponseSuccessDto,
} from './dto/get-item-response.dto';
import {
  UpdateItemResponseFailDto,
  UpdateItemResponseSuccessDto,
} from './dto/update-item-response.dto';
import {
  UpdateItemStatusResponseFailDto,
  UpdateItemStatusResponseSuccessDto,
} from './dto/update-item-status-response.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  create(createItemDto: CreateItemDto) {

    
    try {
      
    } catch(err) {

    }


    return 'This action adds a new item';
  }

  findAll(categoryId: number, locationId: number): FindItemsDto {
    return;
  }

  findOne(id: number): GetItemResponseSuccessDto | GetItemResponseFailDto {
    return;
  }

  update(
    id: number,
    updateItemDto: UpdateItemDto,
  ): UpdateItemResponseSuccessDto | UpdateItemResponseFailDto {
    return;
  }

  updateStatus(
    id: number,
    statusId: number,
  ): UpdateItemStatusResponseFailDto | UpdateItemStatusResponseSuccessDto {
    return;
  }

  remove(id: number): DeleteItemResponseSuccessDto | DeleteItemResponseFailDto {
    return;
  }

  addLike(id: number) {
    return;
  }

  deleteLike(id: number) {
    return;
  }
}
