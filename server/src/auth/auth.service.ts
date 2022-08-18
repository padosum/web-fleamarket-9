import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import {
  LoginResponseFailDto,
  LoginResponseSuccessDto,
} from './dto/login-response.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LogoutResponseDto } from './dto/logout-response.dto';
import { SHA256 } from 'crypto-js';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  login(
    loginUserDto: LoginUserDto,
  ): LoginResponseSuccessDto | LoginResponseFailDto {
    return;
  }

  logout(): LogoutResponseDto {
    return;
  }

  async validateUser(id: string, password: string): Promise<any> {
    const user = await this.usersService.getUserInfoById(id);
    const passwordVaild = SHA256(password).toString() === user.password;

    if (!user) {
      throw new NotAcceptableException('사용자를 찾을 수 없습니다.');
    }
    if (user && passwordVaild) {
      return {
        id: user.id,
        name: user.name,
        idx :user.idx
      };
    }
    return null;
  }
}
