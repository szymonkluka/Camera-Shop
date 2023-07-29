import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Order } from '.prisma/client';
import { EmailService } from '../shared/services/email.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private ordersService: OrdersService,
    private emailService: EmailService,
  ) { }

  @Get('/')
  getAll(): any {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const prod = await this.ordersService.getById(id);
    if (!prod) throw new NotFoundException('Order not found');
    return prod;
  }

  @Post('/')
  create(@Body() orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.ordersService.create(orderData);
  }

  @Post('/send-email')
  async sendOrderEmail(@Body() emailData: { email: string; orderData: any }) {
    const { email, orderData } = emailData;

    // Use the EmailService to send the email
    await this.emailService.sendOrderEmail(email, orderData);

    return { message: 'Email sent successfully' };
  }

  @Delete('/:id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    const deletedOrder = await this.ordersService.deleteById(id);
    if (!deletedOrder) throw new NotFoundException('Product not found');
    return { message: 'Orders deleted successfully' };
  }
}
