import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/firebase/firebase-auth.guard';

@Controller('error')
export class ErrorController {
  constructor() {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  getHome(@Body('error') error: any, @Body('additional') additional: any) {
    console.error(error);
    console.error(additional);
  }
}
