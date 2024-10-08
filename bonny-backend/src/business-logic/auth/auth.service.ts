import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as base58 from 'bs58';
import * as nacl from 'tweetnacl';
import { UserService } from 'src/business-logic/user/user.service';

@Injectable()
export class AuthService {
  nonceExpiration = 300000;
  nonceMap = new Map();
  nonceTimeoutMap = new Map();

  constructor(
    private userService: UserService,
  ) {}

  getNonce(pubkey: string) {
    const nonce = crypto.randomBytes(16).toString('hex');
    this.nonceMap.set(pubkey, nonce);
    return nonce;
  }

  async hasUser(pubkey: string) {
    const user = await this.userService.get(pubkey);
    console.log(user);
    const hasUser = user != undefined;
    console.log(hasUser);
    return hasUser;
  }

}
