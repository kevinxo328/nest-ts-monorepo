import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserPayload } from "../interfaces/payload.interface";

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request: Express.Request & UserPayload = context
      .switchToHttp()
      .getRequest();
    return request.user;
  }
);
