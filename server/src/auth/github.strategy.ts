import { Strategy } from 'passport-github2';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GITHUB_CALLBACK_URL'),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    const { id, name } = profile._json;
    const githubId = `${id}@github`;

    const findUser = await this.usersService.getUserInfoById(githubId);
    if (!findUser.idx) {
      const newUser = await this.usersService.createGithubUser(githubId, name);

      const { message, ...newUserInfo } = newUser;
      if (message) {
        throw new HttpException(
          'github user 생성 실패',
          HttpStatus.BAD_REQUEST,
        );
      }
      return done(null, newUserInfo);
    }

    const { password, ...user } = findUser;

    return done(null, user);
  }
}
