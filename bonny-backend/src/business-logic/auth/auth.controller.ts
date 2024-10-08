import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private adminService: AuthService,
    private userService: UserService
  ) {}

  @Get()
  async getNonce(@Query('pubkey') pubkey: string) {
    const nonce = this.adminService.getNonce(pubkey);
    return { nonce: nonce };
  }

  @Get('/exists/email')
  async emailExists(@Query('email') email: string) {
    const user = await this.userService.findByUserByEmail(email)
    return user != undefined
  }

  
  @Get('/exists/username')
  async userExists(@Query('username') username: string) {
    const user = await this.userService.findByUserName(username)
    return user != undefined
  }

}
