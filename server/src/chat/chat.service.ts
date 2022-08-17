import { Injectable } from '@nestjs/common';
import { ChatRoomResponseDto } from './dto/chat-room-response.dto';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatService {
  create(createChatDto: CreateChatDto): ChatRoomResponseDto {
    return;
  }

  findAll(userId, itemId): ChatRoomResponseDto[] {
    return;
  }

  sendMessage(id: number) {
    return;
  }

  readMessage(id: number) {
    return;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
