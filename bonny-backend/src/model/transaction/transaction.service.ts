import { Injectable } from '@nestjs/common';
import { Transaction } from './transaction.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../profile/profile.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async getAll(): Promise<Transaction[]> {
    return await this.transactionRepository.find({
      relations: {
        receipt: true,
      },
    });
  }

  async add(transaction: Transaction): Promise<Transaction> {
    const newTransaction = await this.transactionRepository.create(transaction);
    return await this.transactionRepository.save(newTransaction);
  }

  async addReferralBonusTrx(
    refereeProfile: Profile,
    bonusAmount: number,
  ): Promise<Transaction> {
    const newTransaction = await this.transactionRepository.create({
      profile: refereeProfile,
      tokens: bonusAmount,
      type: 'referral_bonus',
      blockchainTxId: '',
      status: 'confirmed',
    } as Transaction);
    return await this.transactionRepository.save(newTransaction);
  }

  async addReferralComissionTrx(refereeProfile: Profile, comission: number) {
    const comissionTrx = await this.transactionRepository.create({
      profile: refereeProfile, // we need the referee here, otherwise we don't know who caused the comission
      tokens: comission,
      type: 'referral_comission',
      blockchainTxId: '',
      status: 'confirmed',
    } as Transaction);
    return await this.transactionRepository.save(comissionTrx);
  }

  async get(id: number): Promise<Transaction> {
    return await this.transactionRepository.findOneBy({ id: id });
  }

  async update(
    id: number,
    transaction: Partial<Transaction>,
  ): Promise<Transaction> {
    await this.transactionRepository.update(id, transaction);
    return await this.transactionRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.transactionRepository.findOneByOrFail({ id: id });
    return await this.transactionRepository.delete(id);
  }
}
