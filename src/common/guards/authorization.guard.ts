import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, mixin } from "@nestjs/common";

export const AuthorizeGuard = (allowedRoles: string[]) => { 
  class RolesGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const req = context.switchToHttp().getRequest();

      const result = req.currentUser?.roles.map(
        (role: string) => allowedRoles.includes(role))
        .find((val: boolean) => val === true);
      
      if (result) return true;
      throw new UnauthorizedException("No estás autorizado");
    }
  }
  const guard = mixin(RolesGuardMixin);
  return guard;
}
