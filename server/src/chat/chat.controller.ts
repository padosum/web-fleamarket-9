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
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ChatService } from './chat.service';
import { ChatMessageResponseDto } from './dto/chat-message-response.dto';
import { ChatRoomResponseDto } from './dto/chat-room-response.dto';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { CreateChatRoomResponseDto } from './dto/create-chat-room-response.dto';
import { CreateChatDto } from './dto/create-chat.dto';

@UseGuards(AuthenticatedGuard)
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
  @ApiQuery({
    name: 'itemId',
    type: Number,
    required: false,
  })
  @ApiResponse({
    type: [ChatRoomResponseDto],
    description: 'success',
    status: 200,
  })
  @Get()
  findAll(@Query('itemId') itemId: number, @Request() req: any) {
    const {
      user: { idx },
    } = req;
    return this.chatService.findAllChatRoom(idx, itemId);
  }

  @ApiOperation({
    summary: 'chat message 조회 API',
    description: 'chat message를 조회한다.',
  })
  @ApiQuery({
    name: 'chatId',
    type: Number,
    example: 1,
    required: true,
  })
  @ApiQuery({
    name: 'lastMessageId',
    type: Number,
    required: false,
  })
  @ApiResponse({
    type: [ChatMessageResponseDto],
    description: 'success',
    status: 200,
  })
  @Get('/message')
  findAllMessage(
    @Query('chatId') chatId: number,
    @Request() req: any,
    @Query('lastMessageId') lastMessageId?: number,
  ): Promise<ChatMessageResponseDto[]> {
    const {
      user: { idx: userIdx },
    } = req;
    return this.chatService.findAllMessage(chatId, lastMessageId, userIdx);
  }

  @ApiOperation({
    summary: 'chat message 전송 API',
    description: 'chat message를 전송한다.',
  })
  @Post(':id')
  sendMessage(
    @Param('id') chatId: number,
    @Body() createChatMessageDto: CreateChatMessageDto,
    @Request() req: any,
  ) {
    const {
      user: { idx },
    } = req;
    return this.chatService.sendMessage(createChatMessageDto, chatId, idx);
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
