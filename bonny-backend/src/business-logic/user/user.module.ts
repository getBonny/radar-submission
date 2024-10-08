import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbModule } from 'src/db/database.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [DbModule],
  exports: [UserService],
})
export class UserModule {}
