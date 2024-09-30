import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthneticatedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
