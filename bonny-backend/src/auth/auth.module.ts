import { Module } from '@nestjs/common';
import { AuthStrategy } from './authentication/authentication.strategy';
import { AuditModule } from '../business-logic/audit/audit.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [AuditModule, PassportModule],
  providers: [AuthStrategy],
})
export class SupabaseAuthModule {}
