import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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
import Imysql from 'mysql2/typings/mysql/lib/protocol/packets';

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
  ): Promise<FindItemsDto[]> {
    try {
      const result: FindItemsDto[] = [];
      const sql = `
      SELECT 
        * 
      FROM ITEM
      WHERE 1=1
      ${categoryId ? `AND category = ${categoryId}` : ''}
      ${locationId ? `AND code = "${locationId}"` : ''}
      `;

      const [queryRes] = (await this.conn.query(sql)) as any[];

      queryRes.forEach((item) => {
        result.push({
          title: item.title,
          chatRoomCount: 0,
          image: item.images,
          isLike: false,
          location: item.code,
          updatedAt: item.updatedAt,
        });
      });

      return result;
    } catch (err) {
      throw new HttpException(
        '아이템 조회 중 에러가 발생했습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findItemDetail(
    id: number,
  ): Promise<GetItemResponseSuccessDto | GetItemResponseFailDto> {
    try {
      if (isNaN(id)) throw '올바른 아이템 id가 아닙니다.';

      const sql = `
        SELECT
          images,
          category,
          updatedAt,
          title,
          contents,
          price,
          seller,
          code as location,
          IFNULL(viewCount, 0) as viewCount,
          status
        FROM
          ITEM
        WHERE
          idx = ${id}
      `;

      const [queryRes]: any[] = await this.conn.query(sql);

      if (queryRes.length === 0) throw '아이템을 찾을 수 없습니다.';

      const item = queryRes[0];
      const res: GetItemResponseSuccessDto = {
        category: item.category,
        chatRoomCount: 0,
        contents: item.contents,
        images: item.images,
        isLike: false,
        location: item.location,
        price: item.price,
        seller: item.seller,
        status: item.status,
        title: item.title,
        updatedAt: item.updatedAt,
        viewCount: item.viewCount,
      };

      return res;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    id: number,
    updateItemDto: UpdateItemDto,
  ): Promise<UpdateItemResponseSuccessDto | UpdateItemResponseFailDto> {
    try {
      const { title, images, price, contents, code, category } = updateItemDto;
      const sql = `
        UPDATE
          ITEM
        SET
          ${title ? `title = "${title}",` : ''}
          ${
            images && Array.isArray(images)
              ? `images = "${images.join(',')}",`
              : ''
          }
          ${price ? `price = ${price},` : ''}
          ${contents ? `contents = "${contents}",` : ''}
          ${code ? `code = "${code}",` : ''}
          ${category ? `category = ${category},` : ''}
          idx = ${id}
        WHERE
          idx = ${id}
      `;

      await this.conn.query(sql);

      return { id };
    } catch (err) {
      throw new HttpException(
        '아이템 업데이트 중 에러가 발생했습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateStatus(
    id: number,
    statusId: number,
    userIdx,
  ): Promise<
    UpdateItemStatusResponseFailDto | UpdateItemStatusResponseSuccessDto
  > {
    try {
      const itemInfo = (await this.findItemDetail(
        id,
      )) as GetItemResponseSuccessDto;

      if (itemInfo.seller !== userIdx)
        throw '내가 등록한 아이템의 상태만 변경할 수 있습니다.';

      if (!statusId) throw '상태코드를 입력해주세요.';

      const sql = `
        UPDATE 
          ITEM
        SET
          status = ${statusId}
        WHERE
          idx = ${id}
      `;

      await this.conn.query(sql);

      return { id };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(
    id: number,
    userIdx: number,
  ): Promise<DeleteItemResponseSuccessDto | DeleteItemResponseFailDto> {
    try {
      const itemInfo = (await this.findItemDetail(
        id,
      )) as GetItemResponseSuccessDto;

      if (itemInfo.seller !== userIdx) {
        throw '내가 등록한 아이템만 삭제할 수 있습니다.';
      }

      const sql = `
        DELETE FROM
          ITEM
        WHERE
          idx = ${id}
      `;

      await this.conn.query(sql);

      return { id };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async addLike(id: number, userIdx: number) {
    // 이미 좋아요 상태인지 확인
    try {
      const likeInfo = await this.getLikeInfo(id, userIdx);

      if (likeInfo) return { idx: likeInfo.idx };

      const sql = `
        INSERT INTO
          USER_LIKE_ITEM(userId, itemId)
          VALUES(${userIdx}, ${id})
      `;

      const [res]: [Imysql.ResultSetHeader, Imysql.FieldPacket[]] =
        await this.conn.query(sql);

      return { idx: res.insertId };
    } catch (err) {
      throw new HttpException(
        '좋아요 중 에러가 발생했습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteLike(id: number, userIdx: number) {
    try {
      const sql = `
        DELETE FROM 
          USER_LIKE_ITEM
        WHERE
          userId = ${userIdx} AND
          itemId = ${id}
      `;

      await this.conn.query(sql);

      return { itemId: id, userId: userIdx };
    } catch (err) {
      throw new HttpException(
        '좋아요 취소 중 에러가 발생했습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getLikeInfo(id: number, userIdx: number) {
    try {
      const sql = `
        SELECT 
          *
        FROM
          USER_LIKE_ITEM
        WHERE
          userId = ${userIdx} AND
          itemId = ${id}
      `;

      const [res] = await this.conn.query(sql);

      return res[0];
    } catch (err) {
      throw new HttpException(
        '좋아요 정보 조회 중 에러가 발생했습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
