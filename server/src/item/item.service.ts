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
      const { title, images, price, contents, code, category, locationId } =
        createItemDto;

      if (!title) throw '제목을 입력해주세요.';
      if (!Array.isArray(images) || images.length === 0)
        throw '이미지를 업로드해주세요.';
      if (price === undefined) throw '가격을 입력해주세요.';
      if (!contents) throw '내용을 입력해주세요.';
      if (!code) throw '지역을 입력해주세요.';
      if (!category) throw '카테고리를 선택해주세요.';

      const sql = `
      INSERT INTO
        ITEM(images, title, price, contents, code, category, status, seller, locationId)
      VALUES
        ("${images.join(
          ',',
        )}", "${title}", ${price}, "${contents}", "${code}", ${category}, ${1}, ${userIdx}, ${locationId})
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

  async findOtherItems(
    userIdx?: number,
    categoryId?: number,
    locationId?: number,
  ): Promise<FindItemsDto[]> {
    try {
      const result: FindItemsDto[] = [];
      const sql = `
      SELECT 
        * 
      FROM ITEM
      WHERE 1=1
      ${categoryId ? `AND category = ${categoryId}` : ''}
      ${locationId ? `AND locationId = "${locationId}"` : ''}
      ${userIdx ? `AND seller != ${userIdx}` : ''}
      `;

      const [queryRes] = (await this.conn.query(sql)) as any[];

      for (const item of queryRes) {
        let isLike = false;
        if (userIdx) {
          // 내가 좋아요 했는지 확인
          const isLikedSql = `
            SELECT 
              count(idx) as count 
            FROM USER_LIKE_ITEM 
            WHERE 
              itemId = ${item.idx} AND
              userId = ${userIdx}
          `;

          const [isLikeRes] = await this.conn.query(isLikedSql);

          if (isLikeRes[0].count > 0) isLike = true;
        }

        result.push({
          idx: item.idx,
          title: item.title,
          chatRoomCount: 0,
          likeCount: item.likeCount,
          viewCount: item.viewCount,
          image: item.images,
          isLike,
          location: item.code,
          updatedAt: item.updatedAt,
          price: item.price,
        });
      }

      return result;
    } catch (err) {
      throw new HttpException(
        '아이템 조회 중 에러가 발생했습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findMyItems(userIdx?: number): Promise<FindItemsDto[]> {
    try {
      const sql = `
      SELECT ITEM.idx as idx
           , ITEM.images
           , ITEM.category
           , ITEM.updatedAt
           , ITEM.title
           , ITEM.contents
           , IFNULL(ITEM.likeCount, 0) as likeCount
           , ITEM.price
           , ITEM.seller
           , ITEM.code as location
           , IFNULL(ITEM.viewCount, 0) as viewCount
           , ITEM.status
           , ITEM.locationId
           , IFNULL((SELECT true
                       FROM USER_LIKE_ITEM
                      WHERE USER_LIKE_ITEM.itemId = ITEM.idx
                     ${
                       userIdx
                         ? `AND USER_LIKE_ITEM.userId = ${userIdx}`
                         : 'AND USER_LIKE_ITEM.userId = NULL'
                     }
                   ), false) as isLike
           , IFNULL((SELECT count(idx) 
                       FROM CHAT
                      WHERE CHAT.itemId = ITEM.idx
                        AND CHAT.idx IN (SELECT chatId FROM CHAT_MESSAGE)), 0) as chatRoomCount
        FROM ITEM
       WHERE seller = ${userIdx}
      `;

      const [res]: [Imysql.ResultSetHeader, Imysql.FieldPacket[]] =
        await this.conn.query(sql);

      let myItems: FindItemsDto[] = [].slice.call(res, 0);
      return myItems;
    } catch (err) {
      throw new HttpException(
        '아이템 조회 중 에러가 발생했습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findLikedItems(userIdx?: number): Promise<FindItemsDto[]> {
    try {
      // 내가 좋아요 한 아이템 목록들
      const likedItemSql = `
        SELECT *
        FROM USER_LIKE_ITEM
        WHERE 
          userId = ${userIdx}
      `;
      const [likedItems] = await this.conn.query(likedItemSql);

      const result: FindItemsDto[] = [];
      const sql = `
      SELECT 
        * 
      FROM ITEM
      WHERE
      idx in (${[0, ...(likedItems as any[]).map((item) => item.itemId)]})
      `;

      const [queryRes] = (await this.conn.query(sql)) as any[];

      for (const item of queryRes) {
        let isLike = false;
        if (userIdx) {
          // 내가 좋아요 했는지 확인
          const isLikedSql = `
            SELECT 
              count(idx) as count 
            FROM USER_LIKE_ITEM 
            WHERE 
              itemId = ${item.idx} AND
              userId = ${userIdx}
          `;

          const [isLikeRes] = await this.conn.query(isLikedSql);

          if (isLikeRes[0].count > 0) isLike = true;
        }

        result.push({
          idx: item.idx,
          title: item.title,
          chatRoomCount: 0,
          likeCount: item.likeCount,
          viewCount: item.viewCount,
          image: item.images,
          isLike,
          location: item.code,
          updatedAt: item.updatedAt,
          price: item.price,
        });
      }

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
    userIdx: number,
  ): Promise<GetItemResponseSuccessDto | GetItemResponseFailDto> {
    try {
      if (isNaN(id)) throw '올바른 아이템 id가 아닙니다.';

      const sql = `
      SELECT ITEM.images
          , ITEM.category
          , ITEM.updatedAt
          , ITEM.title
          , ITEM.contents
          , IFNULL(ITEM.likeCount, 0) as likeCount
          , ITEM.price
          , ITEM.seller
          , seller.name as sellerName
          , ITEM.code as location
          , IFNULL(ITEM.viewCount, 0) as viewCount
          , ITEM.status
          , ITEM.locationId
          , CATEGORY.name as categoryName
          , IFNULL((SELECT true
                      FROM USER_LIKE_ITEM
                     WHERE USER_LIKE_ITEM.itemId = ITEM.idx
                     ${
                       userIdx
                         ? `AND USER_LIKE_ITEM.userId = ${userIdx}`
                         : 'AND USER_LIKE_ITEM.userId = NULL'
                     }
                       ), false) as isLike
          , IFNULL((SELECT count(idx) 
                      FROM CHAT
			               WHERE CHAT.itemId = ITEM.idx
                       AND CHAT.idx IN (SELECT chatId FROM CHAT_MESSAGE)), 0) as chatRoomCount
      FROM ITEM
     INNER JOIN USER as seller 
       ON ITEM.seller = seller.idx
     INNER JOIN CATEGORY
        ON ITEM.category = CATEGORY.idx
     WHERE ITEM.idx = ${id}
      `;

      const [queryRes]: any[] = await this.conn.query(sql);

      if (queryRes.length === 0) throw '아이템을 찾을 수 없습니다.';

      // 조회수 업데이트 쿼리
      const viewCountUpdateSql = `
        UPDATE ITEM
        SET
          viewCount = ${queryRes[0].viewCount + 1}
        WHERE
          idx = ${id}
      `;
      await this.conn.query(viewCountUpdateSql);

      const item = queryRes[0];
      const res: GetItemResponseSuccessDto = {
        category: item.category,
        chatRoomCount: item.chatRoomCount,
        contents: item.contents,
        images: item.images,
        isLike: item.isLike,
        location: item.location,
        likeCount: item.likeCount,
        price: item.price,
        seller: item.seller,
        sellerName: item.sellerName,
        status: item.status,
        title: item.title,
        updatedAt: item.updatedAt,
        viewCount: item.viewCount,
        categoryName: item.categoryName,
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
        userIdx,
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
        userIdx,
      )) as GetItemResponseSuccessDto;

      if (itemInfo.seller !== userIdx) {
        throw '내가 등록한 아이템만 삭제할 수 있습니다.';
      }

      // 관련된 채팅 조회
      const findRelatedChatSql = `
        SELECT idx FROM CHAT Where itemId = ${id}
      `;
      const [relatedChats] = (await this.conn.query(findRelatedChatSql)) as any;

      // 관련 채팅 메시지 삭제
      const deleteRelatedChatMessageSql = `
        DELETE FROM CHAT_MESSAGE Where chatId in (${[
          0,
          ...relatedChats.map((relatedChat) => relatedChat.idx),
        ]})
      `;
      await this.conn.query(deleteRelatedChatMessageSql);

      // 관련 채팅 삭제
      const deleteRelatedChatSql = `
        DELETE FROM CHAT Where itemId = ${id}
      `;
      await this.conn.query(deleteRelatedChatSql);

      // 관련 좋아요 삭제
      const deleteRelatedLikeSql = `
        DELETE FROM USER_LIKE_ITEM WHERE itemId = ${id}
      `;
      await this.conn.query(deleteRelatedLikeSql);

      const itemDeleteSql = `
        DELETE FROM
          ITEM
        WHERE
          idx = ${id}
      `;

      await this.conn.query(itemDeleteSql);

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

      // like Count + 1처리
      // 기존 카운트
      const itemDetail = (await this.findItemDetail(
        id,
        userIdx,
      )) as GetItemResponseSuccessDto;

      const itemUpdateSql = `
        UPDATE ITEM
          SET
            likeCount = ${itemDetail.likeCount + 1}
          WHERE
            idx = ${id}
      `;

      await this.conn.query(itemUpdateSql);

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

      // like 개수 체크 쿼리
      const checkLikeCountSql = `
        SELECT 
          count(idx) as count 
        FROM USER_LIKE_ITEM 
        WHERE 
          itemId = ${id}
      `;
      const [res] = await this.conn.query(checkLikeCountSql);

      // ITEM count 업데이트
      const itemCountUpdateSql = `
        UPDATE ITEM
        SET
          likeCount = ${res[0].count}
        WHERE
          idx = ${id}  
      `;
      await this.conn.query(itemCountUpdateSql);

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
