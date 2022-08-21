import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/auth/strategy/local.strategy';
import { SessionSerializer } from './session.serializer';
import { UsersService } from 'src/users/users.service';
import { GithubStrategy } from './strategy/github.strategy';

@Module({
  imports: [PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    LocalStrategy,
    SessionSerializer,
    GithubStrategy,
  ],
})
export class AuthModule {}
