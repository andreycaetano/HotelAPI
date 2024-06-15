import { Request } from 'express';
import { Account } from 'src/app/account/entities/account.entity';


export interface AuthRequest extends Request {
  user: Account;
}
