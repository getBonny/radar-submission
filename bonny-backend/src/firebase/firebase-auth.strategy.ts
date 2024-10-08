import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { FirebaseProvider } from './firebase.provider';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { CurrentUserService } from '../audit/current-user.service';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { ProfileService } from 'src/model/profile/profile.service';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-auth',
) {
  constructor(
    private firebaseProvider: FirebaseProvider,
    private moduleRef: ModuleRef,
    private profile: ProfileService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, token: string) {
    const contextId = ContextIdFactory.getByRequest(request);
    const currentUserService = await this.moduleRef.resolve(
      CurrentUserService,
      contextId,
      { strict: false },
    );
    const firebaseUser: DecodedIdToken = await this.firebaseProvider
      .getFirebase()
      .auth()
      .verifyIdToken(token, true)
      .catch((err) => {
        console.error(err);
        throw new UnauthorizedException(err.message);
      });
    if (!firebaseUser) {
      throw new UnauthorizedException();
    }

    // const userCreationDate = await this.getUserCreationDate(firebaseUser);
    // if (
    //   userCreationDate.getTime() > new Date(2024, 9, 8, 0, 0, 0, 0).getTime() &&
    //   !firebaseUser.email_verified
    // ) {
    //   throw new UnauthorizedException();
    // }

    currentUserService.setUsername(firebaseUser.uid);
    return firebaseUser;
  }

  private async getUserCreationDate(
    firebaseUser: DecodedIdToken,
  ): Promise<Date> {
    const profile = await this.profile.get(firebaseUser.uid);

    if (profile) {
      return profile.createdOn;
    } else {
      const user = await this.firebaseProvider
        .getFirebase()
        .auth()
        .getUser(firebaseUser.uid);
      return new Date(Date.parse(user.metadata.creationTime!));
    }
  }
}
