import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class SuperAdminGuard implements CanActivate{
  canActivate(context: ExecutionContext):boolean{
    const request = context.switchToHttp().getRequest();
    return request.payload?.role?.name==="Super Admin";
  }
  }

