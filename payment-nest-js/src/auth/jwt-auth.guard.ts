import {
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { GenerateToken } from './dto/generate-token.dto';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/user/user.schema';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector, private authService: AuthService) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(
    _err: never,
    user: GenerateToken,
    _info: never,
    context: ExecutionContext,
  ): GenerateToken | any {
    return user;
  }
}
