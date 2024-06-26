import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';
import { AccountService } from '../account/account.service';
import { Account } from '../account/entities/account.entity';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly accountService: AccountService,
  ) {}

  async login(user: Account): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      role: user.role
    };

    return {
      token: this.jwtService.sign(payload),
      role: user.role,
      user: user.username
    };
  }

  async validateUser(email: string, password: string): Promise<Account> {
    const user = await this.accountService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new UnauthorizedException(
      'Email address or password provided is incorrect.',
    );
  }

  async verifyToken (request: Request) {
    const token = request.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      throw new BadRequestException(401, "Token is required",);
   }
   try {
     const decode = this.jwtService.verify(token)
     return {
      valid: true,
      role: decode.role
     }
   } catch (error) {
    throw new UnauthorizedException('Token invalid')
   }
  }
}
