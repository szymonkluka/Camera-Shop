import { Injectable } from '@nestjs/common';
import { Order, Product } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) { }

  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany();
  }

  public getById(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
    });
  }

  public async getProductsByOrderId(orderId: Order['id']): Promise<Product[]> {
    return this.prismaService.order
      .findUnique({ where: { id: orderId } })
      .products();
  }

  public create(
    orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Order> {
    return this.prismaService.order.create({
      data: orderData,
    });
  }

  public deleteById(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.delete({
      where: { id },
    });
  }
}
