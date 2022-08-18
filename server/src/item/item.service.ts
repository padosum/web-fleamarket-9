import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { query } from 'express';
import { Connection } from 'mysql2/promise';

import { MYSQL_CONNECTION } from 'src/constants';
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
  constructor(@Inject(MYSQL_CONNECTION) private conn: Connection) {}

  async create(createItemDto: CreateItemDto, userIdx: number): Promise<number> {
    try {
      await this.conn.beginTransaction();
      const { title, images, price, contents, code, category } = createItemDto;

      if (!title) throw '제목을 입력해주세요.';
      if (!Array.isArray(images) || images.length === 0)
        throw '이미지를 업로드해주세요.';
      if (!price) throw '가격을 입력해주세요.';
      if (!contents) throw '내용을 입력해주세요.';
      if (!code) throw '지역을 입력해주세요.';
      if (!category) throw '카테고리를 선택해주세요.';

      const sql = `
      INSERT INTO
        ITEM(images, title, price, contents, code, category, status, seller)
      VALUES
        ("${images.join(
          ',',
        )}", "${title}", ${price}, "${contents}", "${code}", ${category}, ${1}, ${userIdx})
      `;

      const [res] = (await this.conn.query(sql)) as any;
      const insertId = res.insertId;
      await this.conn.commit();

      return insertId;
    } catch (err) {
      await this.conn.rollback();
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findItems(
    categoryId: number,
    locationId: number,
  ): Promise<FindItemsDto> {
    try {
      const result = [];
      const sql = `
      SELECT * FROM ITEM 
      `;

      const res = await this.conn.query(sql);

      console.log(res);
    } catch (err) {}
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
