import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AffiliateService } from './affiliate.service';
import { Affiliate } from 'src/db/schema';

@Controller('affiliate')
export class AffiliateController {
  constructor(private affiliateService: AffiliateService) {}

  @Get()
  getAll(@Req() req: Request) {
    return this.affiliateService.getAll(req['language']);
  }

  @Post()
  add(@Body() affiliate: Affiliate) {
    return this.affiliateService.add(affiliate);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.affiliateService.get(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() user: Affiliate) {
    return this.affiliateService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    this.affiliateService.remove(id);
  }
}
