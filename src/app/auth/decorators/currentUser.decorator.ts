import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '../models/AuthRequest';
import { Account } from 'src/app/account/entities/account.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): Account => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
