import { Module } from '@nestjs/common';
import { FirebaseAuthStrategy } from './firebase-auth.strategy';
import { FirebaseProvider } from './firebase.provider';
import { AuditModule } from '../audit/audit.module';
import { PassportModule } from '@nestjs/passport';
import { ProfileModule } from 'src/model/profile/profile.module';

@Module({
  imports: [AuditModule, PassportModule, ProfileModule],
  providers: [FirebaseAuthStrategy, FirebaseProvider],
  exports: [FirebaseProvider],
})
export class FirebaseModule {}
