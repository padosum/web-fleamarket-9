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
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { ChatRoomResponseDto } from './dto/chat-room-response.dto';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { CreateChatRoomResponseDto } from './dto/create-chat-room-response.dto';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('chat')
@ApiTags('Chat API')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiOperation({
    summary: 'chat room 추가 API',
    description: 'chat room을 추가한다.',
  })
  @ApiResponse({
    type: CreateChatRoomResponseDto,
    description: 'success',
    status: 200,
  })
  @Post()
  create(
    @Body() createChatDto: CreateChatDto,
  ): Promise<CreateChatRoomResponseDto> {
    return this.chatService.create(createChatDto);
  }

  @ApiOperation({
    summary: 'chat room 조회 API',
    description: 'chat room을 조회한다.',
  })
  @ApiResponse({
    type: [ChatRoomResponseDto],
    description: 'success',
    status: 200,
  })
  @Get()
  findAll(
    @Query('userId') userId: number,
    @Query('itemId') itemId: number,
  ): ChatRoomResponseDto[] {
    return this.chatService.findAll(userId, itemId);
  }

  @ApiOperation({
    summary: 'chat message 조회 API',
    description: 'chat message를 조회한다.',
  })
  @ApiQuery({
    name: 'lastMessageId',
    type: Number,
    required: false,
  })
  @ApiResponse({
    type: [ChatRoomResponseDto],
    description: 'success',
    status: 200,
  })
  @Get('/message')
  findAllMessage(
    @Query('chatId') chatId: number,
    @Query('lastMessageId') lastMessageId?: number,
  ): ChatRoomResponseDto[] {
    return this.chatService.findAll(chatId, lastMessageId);
  }

  @ApiOperation({
    summary: 'chat message 전송 API',
    description: 'chat message를 전송한다.',
  })
  @Post(':id')
  sendMessage(
    @Param('id') id: number,
    @Body() createChatMessageDto: CreateChatMessageDto,
  ) {
    return this.chatService.sendMessage(id);
  }

  @ApiOperation({
    summary: 'chat message 읽기 API',
    description: 'chat message 읽기',
  })
  @Patch(':id')
  readMessage(@Param('id') id: number) {
    return this.chatService.readMessage(id);
  }

  @ApiOperation({
    summary: 'chat room 삭제 API',
    description: 'chat room을 삭제한다.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
