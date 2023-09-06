import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

@Injectable()
export class AuthenticationGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean {
    const req = context.switchToHttp().getRequest();
    return req.currentUser;
  }
}