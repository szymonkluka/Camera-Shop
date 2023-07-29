import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/shared/services/prisma.service';
import { EmailService } from '../shared/services/email.service';

@Module({
  providers: [OrdersService, PrismaService, EmailService],
  controllers: [OrdersController],
})
export class OrdersModule { }
