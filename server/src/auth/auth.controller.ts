import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import {
  LoginResponseFailDto,
  LoginResponseSuccessDto,
} from './dto/login-response.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LogoutResponseDto } from './dto/logout-response.dto';
import { LocalAuthGuard } from 'src/local.auth.guard';
import { GithubOauthGuard } from './github.guard';

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
  @UseGuards(LocalAuthGuard)
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
  logout(@Req() req) {
    req.session.destroy();
    return { msg: 'The user session has ended' };
  }

  @ApiOperation({
    summary: 'user github 로그인',
    description: 'github로 로그인한다.',
  })
  @UseGuards(GithubOauthGuard)
  @Get('/github')
  loginGithub(@Req() req): string {
    return req.user;
  }

  @UseGuards(GithubOauthGuard)
  @Get('/github/callback')
  githubAuthCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.status(HttpStatus.OK).json({ user: req.user });
  }
}
