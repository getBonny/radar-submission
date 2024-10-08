import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { HomeService } from './home.service';
import { FirebaseAuthGuard } from 'src/firebase/firebase-auth.guard';

@Controller('home')
export class HomeController {
  constructor(private homeService: HomeService) {}

  @Get()
  //@UseGuards(FirebaseAuthGuard)
  getHome(@Query('uid') uid: string) {
    return this.homeService.loadHome(uid);
  }
}
