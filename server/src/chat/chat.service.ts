import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mysql2/promise';
import { MYSQL_CONNECTION } from 'src/constants';
import { ChatRoomResponseDto } from './dto/chat-room-response.dto';
import { CreateChatRoomResponseDto } from './dto/create-chat-room-response.dto';
import { CreateChatDto } from './dto/create-chat.dto';
import Imysql from 'mysql2/typings/mysql/lib/protocol/packets';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { ChatMessageResponseDto } from './dto/chat-message-response.dto';

@Injectable()
export class ChatService {
  constructor(@Inject(MYSQL_CONNECTION) private conn: Connection) {}

  async create(
    createChatDto: CreateChatDto,
  ): Promise<CreateChatRoomResponseDto> {
    try {
      const { sellerId, buyerId, itemId } = createChatDto;

      const existChatRoomId = await this.chatRoomExist(createChatDto);

      if (existChatRoomId) {
        return { chatId: existChatRoomId };
      }

      const sql = `
      INSERT INTO CHAT (
        sellerId
      , buyerId
      , itemId) 
      VALUES (
        ${sellerId}
      , ${buyerId}
      , ${itemId}
      );`;

      const [insertRes]: [Imysql.ResultSetHeader, Imysql.FieldPacket[]] =
        await this.conn.query(sql);

      return {
        chatId: insertRes.insertId,
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async chatRoomExist(createChatDto: CreateChatDto) {
    try {
      const { sellerId, buyerId, itemId } = createChatDto;

      const [chatRoom]: [Imysql.ResultSetHeader, Imysql.FieldPacket[]] =
        await this.conn.query(
          `SELECT idx
             FROM CHAT 
            WHERE sellerId = ${sellerId} 
              AND buyerId = ${buyerId} 
              AND itemId = ${itemId};`,
        );

      if (chatRoom[0]) {
        return chatRoom[0].idx;
      }

      return null;
    } catch (err) {
      return null;
    }
  }

  async findAllChatRoom(userIdx, itemId): Promise<ChatRoomResponseDto[]> {
    try {
      const sql = `
      
      SELECT c.idx
	         , CASE WHEN c.sellerId = ${userIdx} THEN buyer.name
			            WHEN c.buyerId = ${userIdx} THEN seller.name 
                  ELSE ''
              END as userName 
	         , m.message
           , m.createAt as updatedAt
           , i.images
           , IFNULL((SELECT COUNT(message.idx)
			                 FROM CHAT_MESSAGE message
		                  WHERE message.chatId = c.idx
                        AND message.sender <> ${userIdx}
                        AND message.read = 0), 0) as unReadCount
	      FROM CHAT c
       INNER JOIN ITEM i
          ON c.itemId = i.idx
       INNER JOIN USER seller
          ON c.sellerId = seller.idx
       INNER JOIN USER buyer
          ON c.buyerId = buyer.idx
       INNER JOIN CHAT_MESSAGE m 
          ON c.idx = m.chatId 
       WHERE (c.sellerId = ${userIdx} 
	        OR c.buyerId = ${userIdx})
	       AND m.idx = (SELECT MAX(message.idx)
                             FROM CHAT_MESSAGE message
					                  WHERE message.chatId = c.idx)
       ${itemId ? `AND itemId = ${itemId}` : ''}
       ORDER BY m.idx DESC;
      `;

      const [res]: [Imysql.ResultSetHeader, Imysql.FieldPacket[]] =
        await this.conn.query(sql);

      let chatRoomList: ChatRoomResponseDto[] = [].slice.call(res, 0);

      return chatRoomList;
    } catch (err) {
      throw new HttpException(
        '채팅방 조회 중 에러가 발생했습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAllMessage(
    chatId: number,
    lastMessageId: number,
    userIdx: number,
  ): Promise<ChatMessageResponseDto[]> {
    try {
      if (!(await this.checkChatMessageAuthorization(chatId, userIdx))) {
        throw new HttpException(
          '채팅 메시지 조회 권한이 없습니다.',
          HttpStatus.FORBIDDEN,
        );
      }

      const sql = `
      SELECT *
        FROM (SELECT idx
                   , sender
                   , message
                   , \`read\`
                   , createAt
               FROM CHAT_MESSAGE
              WHERE chatId = ${chatId}
                ${lastMessageId ? `AND idx < ${lastMessageId}` : ''}
              ORDER BY createAt DESC
              LIMIT ${lastMessageId ? `10` : `30`}) messages
       ORDER BY messages.createAt;
      `;

      const [res]: [Imysql.ResultSetHeader, Imysql.FieldPacket[]] =
        await this.conn.query(sql);

      let chatMessageList: ChatMessageResponseDto[] = [].slice.call(res, 0);

      return chatMessageList;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async checkChatMessageAuthorization(
    chatIdx: number,
    userIdx: number,
  ): Promise<boolean> {
    try {
      const [res] = await this.conn.query(
        `SELECT idx 
           FROM CHAT 
          WHERE (sellerId = ${userIdx} OR buyerId = ${userIdx})
            AND idx = ${chatIdx};`,
      );

      if (!res[0]) {
        return false;
      }

      return true;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async sendMessage(
    createChatMessageDto: CreateChatMessageDto,
    chatId: number,
    idx: number,
  ) {
    try {
      const { message } = createChatMessageDto;
      const [insertRes]: [Imysql.ResultSetHeader, Imysql.FieldPacket[]] =
        await this.conn.query(
          `INSERT INTO CHAT_MESSAGE (
          sender
        , chatId
        , message
        , \`read\`
        ) VALUES (
          ${idx}
        , ${chatId}
        , '${message}'
        , 0
        );`,
        );

      return {
        idx: insertRes.insertId,
        message: '메시지를 성공적으로 전송했습니다.',
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async readMessage(chatId: number, userIdx: number) {
    try {
      if (!(await this.checkChatMessageAuthorization(chatId, userIdx))) {
        throw new HttpException(
          '채팅 메시지 조회 권한이 없습니다.',
          HttpStatus.FORBIDDEN,
        );
      }

      const sql = `
        UPDATE CHAT_MESSAGE
           SET \`read\` = 1
         WHERE chatId = ${chatId}
           AND sender <> ${userIdx}
      `;

      const [res]: [Imysql.ResultSetHeader, Imysql.FieldPacket[]] =
        await this.conn.query(sql);

      return {
        changedRows: res.changedRows,
        message: '메시지를 읽었습니다.',
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(chatId: number, userIdx: number) {
    try {
      if (!(await this.checkChatMessageAuthorization(chatId, userIdx))) {
        throw new HttpException(
          '채팅 룸 삭제 권한이 없습니다.',
          HttpStatus.FORBIDDEN,
        );
      }

      await this.conn.beginTransaction();

      await this.conn.query(
        `DELETE FROM CHAT_MESSAGE WHERE chatId = ${chatId}`,
      );

      const [resDeleteRoom]: [Imysql.ResultSetHeader, Imysql.FieldPacket[]] =
        await this.conn.query(`DELETE FROM CHAT WHERE idx = ${chatId}`);

      this.conn.commit();

      return {
        rows: resDeleteRoom.affectedRows,
        message: '채팅 방을 삭제했습니다.',
      };
    } catch (err) {
      this.conn.rollback();
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async getChatRoomInfo(chatId, userIdx) {
    try {
      const sql = `
        SELECT CHAT.idx
             , ITEM.title
             , ITEM.price
             , ITEM.images
             , ITEM_STATUS.name as itemStatus
             , (CASE WHEN CHAT.buyerId = ${userIdx} THEN CHAT.sellerId ELSE CHAT.buyerId END) as recieverId
             , CHAT.sellerId
             , CHAT.buyerId
             , (SELECT name  
                  FROM USER
                 WHERE idx = CASE WHEN CHAT.buyerId = ${userIdx} THEN CHAT.sellerId ELSE CHAT.buyerId END) as name 
          FROM CHAT
         INNER JOIN ITEM
            ON CHAT.itemId = ITEM.idx  
         INNER JOIN ITEM_STATUS
            ON ITEM.status = ITEM_STATUS.idx
         WHERE CHAT.idx = ${chatId}
           AND (CHAT.buyerId = ${userIdx} OR CHAT.sellerId = ${userIdx});`;

      const [chatRoom]: [Imysql.ResultSetHeader, Imysql.FieldPacket[]] =
        await this.conn.query(sql);

      return chatRoom[0];
    } catch (err) {
      console.log({ err });
      return null;
    }
  }
}
