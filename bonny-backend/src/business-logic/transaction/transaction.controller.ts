import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Receipt, Transaction } from 'src/db/schema';
import { BonnyAuthGuard } from 'src/auth/authentication/authentication.guard';
import { CurrentUser } from 'src/common/decorators';
import { BonnyRolesGuard } from 'src/auth//authorization/roles.guard';
import { CheckOwnership } from 'src/auth/authorization/ownership.decorators';
import { Roles } from 'src/auth/authorization/roles.decorator';
import { Role } from 'src/auth/auth.roles';
import { User } from 'src/auth/auth.user';

@Roles(Role.Admin)
@Controller('transaction')
@UseGuards(BonnyAuthGuard, BonnyRolesGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async getAllTransactions(): Promise<
    (Transaction & { receipt: Receipt[] })[]
  > {
    return this.transactionService.getAll();
  }

  @Get('user')
  @Roles(Role.AppUser)
  async getTransactionsByUser(
    @CurrentUser() user: User,
  ): Promise<Transaction[]> {
    return this.transactionService.getByUser(user.id);
  }

  @Post()
  @Roles(Role.AppUser)
  async createTransaction(
    @Body() transaction: Transaction,
  ): Promise<Transaction> {
    return this.transactionService.add(transaction);
  }

  @Get(':id')
  @CheckOwnership()
  @Roles(Role.AppUser)
  async getTransaction(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Transaction> {
    return await this.transactionService.get(id);
  }

  @Put(':id')
  async updateTransaction(
    @Param('id', ParseIntPipe) id: number,
    @Body() transaction: Partial<Transaction>,
  ): Promise<Transaction> {
    return this.transactionService.update(id, transaction);
  }
}
