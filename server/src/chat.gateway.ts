import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { ChatService } from './chat/chat.service';
import { ItemService } from './item/item.service';
import { UsersService } from './users/users.service';
import {
  AUTH,
  ITEM_UPLOAD,
  ITEM_UPLOADED,
  GET_LIKE,
  SEND_LIKE,
  SEND_CHAT,
  RECEIVE_CHAT,
} from 'fleamarket-9-shared/dist';

@WebSocketGateway(4001)
export class ChatGateway {
  constructor(
    private readonly chatService: ChatService,
    private readonly itemService: ItemService,
    private readonly usersService: UsersService,
  ) {}

  @WebSocketServer()
  server: Server;

  // 유저 인증정보 저장
  @SubscribeMessage(AUTH)
  handleAuth(client: any, payload: any): void {
    client['userId'] = payload;
  }

  // 아이템을 올렸다.
  @SubscribeMessage(ITEM_UPLOAD)
  handleItemUpload(client: any, payload: any): void {
    const clients = Array.from(this.server.clients);

    // payload는 업로드된 아이템 Idx.
    clients.forEach((c: any) => {
      if (c !== client) {
        c.send(JSON.stringify({ event: ITEM_UPLOADED, data: payload }));
      }
    });
  }

  // 좋아요를 했다.
  @SubscribeMessage(SEND_LIKE)
  async handleItemLike(client: any, payload: any): Promise<void> {
    // 좋아요한 아이템
    const { itemId } = payload;
    const userId = client.userId;

    const itemDetail = (await this.itemService.findItemDetail(
      itemId,
      userId,
    )) as any;

    // 좋아요한 사람의 이름
    const userInfo = (await this.usersService.getUserInfoByIdx(userId)) as any;

    // 좋아요한 아이템의 셀러
    const sellerId = itemDetail.seller;
    const clients = Array.from(this.server.clients);

    for (const c of clients) {
      // 해당 셀러에게 메시지 전송
      if (+(c as any).userId === +sellerId) {
        (c as any).send(
          JSON.stringify({
            event: GET_LIKE,
            data: { itemTitle: itemDetail.title, likeUser: userInfo.name },
          }),
        );
      }
    }
  }

  // 채팅을 전송했다.
  @SubscribeMessage(SEND_CHAT)
  handleChatSend(client: any, payload: any): void {
    const clients = Array.from(this.server.clients);

    clients.forEach((c: any) => {
      c.send(
        JSON.stringify({
          event: RECEIVE_CHAT,
          data: { sender: client.userId, message: payload },
        }),
      );
    });
  }
}
