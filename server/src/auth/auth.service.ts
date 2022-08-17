import { Injectable } from '@nestjs/common';
import {
  LoginResponseFailDto,
  LoginResponseSuccessDto,
} from './dto/login-response.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LogoutResponseDto } from './dto/logout-response.dto';

@Injectable()
export class AuthService {
  login(
    loginUserDto: LoginUserDto,
  ): LoginResponseSuccessDto | LoginResponseFailDto {
    return;
  }

  logout(): LogoutResponseDto {
    return;
  }
}
