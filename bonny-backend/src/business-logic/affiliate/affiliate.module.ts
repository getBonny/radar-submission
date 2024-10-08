import { Module } from '@nestjs/common';
import { AffiliateService } from './affiliate.service';
import { AffiliateController } from './affiliate.controller';
import { DbModule } from 'src/db/database.module';

@Module({
  controllers: [AffiliateController],
  imports: [DbModule],
  providers: [AffiliateService],
  exports: [AffiliateService]
})
export class AffiliateModule {}
