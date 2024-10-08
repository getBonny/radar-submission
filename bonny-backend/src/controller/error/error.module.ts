import { Module } from '@nestjs/common';
import { ErrorController } from './error.controller';

@Module({
  controllers: [ErrorController],
  providers: [],
  imports: [],
})
export class ErrorModule {}
