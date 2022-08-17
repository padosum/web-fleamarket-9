import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  LoginResponseFailDto,
  LoginResponseSuccessDto,
} from './dto/login-response.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LogoutResponseDto } from './dto/logout-response.dto';

@Controller('auth')
@ApiTags('Login API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'user 로그인 API',
    description: '로그인한다.',
  })
  @ApiResponse({
    type: LoginResponseSuccessDto,
    description: 'success',
    status: 200,
  })
  @ApiResponse({
    type: LoginResponseFailDto,
    description: 'fail',
    status: 400,
  })
  @Post('/login')
  login(
    @Body() loginUserDto: LoginUserDto,
  ): LoginResponseSuccessDto | LoginResponseFailDto {
    return this.authService.login(loginUserDto);
  }

  @ApiOperation({
    summary: 'user 로그아웃 API',
    description: '로그아웃 한다.',
  })
  @ApiResponse({
    type: LogoutResponseDto,
    description: 'success',
    status: 200,
  })
  @Post('/logout')
  logout() {
    return this.authService.logout();
  }
}
