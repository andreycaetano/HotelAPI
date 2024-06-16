import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Account } from './entities/account.entity';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AccountConflictException } from './errors/accountConflict.error';

@Injectable()
export class AccountService {
  constructor(private readonly prisma : PrismaService) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const data: Prisma.AccountCreateInput = {
      ...createAccountDto,
      password: await bcrypt.hash(createAccountDto.password, 10)
    };
    try {
      const createdAccount = await this.prisma.account.create({ data });
      return {
        ...createdAccount,
        password: undefined
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new AccountConflictException();
      };
    };
  };

  async findByEmail (email: string): Promise<Account> {
    const account = this.prisma.account.findUnique({ where: { email }});
    return {
      ...account,
      password: undefined
    };
  };

  async findAll(): Promise<Account[]> {
    const accounts = await this.prisma.account.findMany()
    const accountsWithoutPasswords = accounts.map(account => {
      return {
        ...account,
        password: undefined
      };
    });
    return accountsWithoutPasswords;
  };

  async findOne(id: string): Promise<Account> {
    const account = await this.prisma.account.findUnique({
      where: { id }
    });
    if(!account) {
      throw new NotFoundException("Account not found.")
    };
    return {
      ...account,
      password: undefined
    };
  };

  async update(id: string, updateAccountDto: UpdateAccountDto): Promise<Account> {
    await this.findOne(id);
    const data: Prisma.AccountUpdateInput = {
      ...updateAccountDto,
      password: updateAccountDto.password ?? await bcrypt.hash(updateAccountDto.password, 10)
    };
    const updatedAccount = await this.prisma.account.update({
      where: { id },
      data

    });
    return {
      ...updatedAccount,
      password: undefined
    };
  };

  async remove(id: string): Promise<void> {
    await this.findOne(id)
    this.prisma.account.delete({ where: { id }});
  }
}
