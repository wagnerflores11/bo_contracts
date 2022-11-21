import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './user';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const jwt = request.headers?.authorization?.replace('Bearer ', '') || null;

    if (!jwt) {
      return false;
    }

    const payload = this.jwtService.decode(jwt);

    if (!payload) {
      return false;
    }

    request.user = new User(payload);

    return !!request.user.id;
  }
}
