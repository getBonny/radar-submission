import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../auth.user';
import { Role } from '../auth.roles';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'supabase') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SUPABASE_JWT_SECRET'),
    });
  }

  async validate(jwtPayload: any): Promise<User> {
    const user: User = {
      id: jwtPayload.sub,
      email: jwtPayload.email,
      role: this.getRoleFromPayload(jwtPayload),
      isEmailVerified: jwtPayload.user_metadata?.email_verified,
      provider: jwtPayload.app_metadata?.provider,
    };
    return user;
  }

  private getRoleFromPayload(payload: any): Role {
    if (payload.role === 'authenticated') {
      return Role.AppUser;
    }
    return payload.role as Role;
  }
}
