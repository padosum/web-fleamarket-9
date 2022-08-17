import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateUserResponseFailDto,
  CreateUserResponseSuccessDto,
} from './dto/create-user-response.dto';
import {
  GetUserResponseFailDto,
  GetUserResponseSuccessDto,
} from './dto/get-user-response.dto';

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
  ): CreateUserResponseSuccessDto | CreateUserResponseFailDto {
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
  @Get('/me')
  getMyInfo(): GetUserResponseSuccessDto | GetUserResponseFailDto {
    return this.usersService.getUserInfo(12);
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
  @Get('/:id')
  getUserInfo(
    @Param('id') id,
  ): GetUserResponseSuccessDto | GetUserResponseFailDto {
    return this.usersService.getUserInfo(id);
  }
}
