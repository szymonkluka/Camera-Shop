import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Order } from '.prisma/client';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) { }

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

  @Delete('/:id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    const deletedOrder = await this.ordersService.deleteById(id);
    if (!deletedOrder) throw new NotFoundException('Product not found');
    return { message: 'Orders deleted successfully' };
  }
}
