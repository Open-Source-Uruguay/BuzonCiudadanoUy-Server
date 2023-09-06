import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const RefreshUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.refreshUser;
  }
);