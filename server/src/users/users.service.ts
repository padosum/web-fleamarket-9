import { Injectable } from '@nestjs/common';
import {
  CreateUserResponseFailDto,
  CreateUserResponseSuccessDto,
} from './dto/create-user-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import {
  GetUserResponseFailDto,
  GetUserResponseSuccessDto,
} from './dto/get-user-response.dto';

@Injectable()
export class UsersService {
  create(
    createUserDto: CreateUserDto,
  ): CreateUserResponseSuccessDto | CreateUserResponseFailDto {
    return;
  }
  getUserInfo(id: number): GetUserResponseSuccessDto | GetUserResponseFailDto {
    return;
  }
}
