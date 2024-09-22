import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from 'src/helpers/public';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector:Reflector,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    try {
      const  isPublic=this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY,[
        context.getHandler(),
        context.getClass(),
      ]);
      if(isPublic){
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      //?.->optional chaining .this means when the authorization is not  
      //?? -> optional quelizing.this means  when there is two items when one is undefined/null
      // then only the next will be run

      if (type !== "Bearer" || !token) {
        throw new UnauthorizedException();
      }

      const payload = await this.jwtService.verifyAsync(
        token, { secret: process.env.SECRET_KEY },
      );
  console.log(payload);
      request['payload'] = payload;
    } catch(err) {
      throw new UnauthorizedException(err);
    }

    return true;
  }
}