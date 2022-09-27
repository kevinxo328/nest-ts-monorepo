import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request: Express.Request & { user: string } = context
      .switchToHttp()
      .getRequest();
    return request.user;
  }
);
