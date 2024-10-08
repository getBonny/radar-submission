import { Module } from '@nestjs/common';
import { TransactionModule } from 'src/model/transaction/transaction.module';
import { ProdegeController } from './prodege.controller';
import { ProdegeService } from './prodege.service';
import { ProfileModule } from 'src/model/profile/profile.module';

@Module({
  controllers: [ProdegeController],
  providers: [ProdegeService],
  imports: [TransactionModule, ProfileModule],
})
export class ProdegeModule {}
