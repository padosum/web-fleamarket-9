import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { ChatService } from './chat/chat.service';
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
  constructor(private readonly chatService: ChatService) {}

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
  handleItemLike(client: any, payload: any): void {
    const clients = Array.from(this.server.clients);

    clients.forEach((c: any) => {
      if (c !== client) {
        c.send(JSON.stringify({ event: GET_LIKE, data: payload }));
      }
    });
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
