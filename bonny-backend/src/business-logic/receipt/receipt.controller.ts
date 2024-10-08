import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import { Receipt, ReceiptType } from '../../db/schema';

@Controller('receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Get('all')
  async getAllReceipts(): Promise<Receipt[]> {
    return this.receiptService.getAll();
  }

  @Post()
  async createReceipt(@Body() receipt: Receipt): Promise<ReceiptType> {
    return this.receiptService.addWithItems(receipt);
  }

  @Get(':id')
  async getReceipt(@Param('id') id: string): Promise<Receipt> {
    const receipt = await this.receiptService.get(Number(id));
    if (!receipt) {
      throw new HttpException('Receipt not found', HttpStatus.NOT_FOUND);
    }
    return receipt;
  }

  @Put(':id')
  async updateReceipt(@Param('id') id: string, @Body() receipt: Partial<Receipt>): Promise<ReceiptType> {
    const updatedReceipt = await this.receiptService.update(Number(id), receipt);
    if (!updatedReceipt) {
      throw new HttpException('Receipt not found', HttpStatus.NOT_FOUND);
    }
    return updatedReceipt;
  }

  @Delete(':id')
  async deleteReceipt(@Param('id') id: string): Promise<void> {
    const result = await this.receiptService.remove(Number(id));
    if (!result) {
      throw new HttpException('Receipt not found', HttpStatus.NOT_FOUND);
    }
  }
}
