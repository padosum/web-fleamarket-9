import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateUserResponseFailDto,
  CreateUserResponseSuccessDto,
} from './dto/create-user-response.dto';
import {
  GetUserResponseFailDto,
  GetUserResponseSuccessDto,
} from './dto/get-user-response.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('users')
@ApiTags('Users API')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'user 생성 API',
    description: 'user를 생성한다.',
  })
  @ApiResponse({
    type: CreateUserResponseSuccessDto,
    description: 'success',
    status: 200,
  })
  @ApiResponse({
    type: CreateUserResponseFailDto,
    description: 'fail',
    status: 400,
  })
  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseSuccessDto | CreateUserResponseFailDto> {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({
    summary: '내 정보 조회 API',
    description: '내 정보를 조회한다.',
  })
  @ApiResponse({
    type: GetUserResponseSuccessDto,
    description: 'success',
    status: 200,
  })
  @ApiResponse({
    type: GetUserResponseFailDto,
    description: 'fail',
    status: 400,
  })
  @UseGuards(AuthenticatedGuard)
  @Get('/me')
  getMyInfo(
    @Request() req,
  ): Promise<GetUserResponseSuccessDto | GetUserResponseFailDto> {
    return this.usersService.getUserInfoByIdx(req.user.idx);
  }

  @ApiOperation({
    summary: 'user 정보 조회 API',
    description: '특정 user 정보를 조회한다.',
  })
  @ApiResponse({
    type: GetUserResponseSuccessDto,
    description: 'success',
    status: 200,
  })
  @ApiResponse({
    type: GetUserResponseFailDto,
    description: 'fail',
    status: 400,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'user index',
  })
  @Get('/:id')
  getUserInfo(
    @Param('id') id,
  ): Promise<GetUserResponseSuccessDto | GetUserResponseFailDto> {
    return this.usersService.getUserInfoByIdx(id);
  }
}
