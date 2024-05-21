import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface AuthUser {
  sub: string;
}

export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext): AuthUser => {
    const graphqlContext = GqlExecutionContext.create(context);
    const request = graphqlContext.getContext().req;

    return request.user;
  },
);
