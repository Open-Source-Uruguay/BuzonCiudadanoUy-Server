import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

@Injectable()
export class RefreshGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean {
    const req = context.switchToHttp().getRequest();
    return req.refreshUser;
  }
}