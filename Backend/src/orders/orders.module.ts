import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/shared/services/prisma.service';

@Module({
  providers: [OrdersService, PrismaService],
  controllers: [OrdersController],
})
export class OrdersModule { }