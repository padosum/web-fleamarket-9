import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if(!request.isAuthenticated()) throw new HttpException('로그인 상태가 아닙니다.', HttpStatus.FORBIDDEN)
    return request.isAuthenticated();
  }
}
