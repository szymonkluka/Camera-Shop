import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) { }

  public getAll(): Promise<Product[]> {
    return this.prismaService.product.findMany();
  }

  public getById(id: Product['id']): Promise<Product | null> {
    return this.prismaService.product.findUnique({
      where: { id },
    });
  }

  public async updateById(
    id: Product['id'],
    productData: Partial<Product>,
  ): Promise<Product | null> {
    const existingProduct = await this.prismaService.product.findUnique({
      where: { id },
    });

    if (!existingProduct) return null;

    return this.prismaService.product.update({
      where: { id },
      data: productData,
    });
  }

  public create(
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Product> {
    return this.prismaService.product.create({
      data: productData,
    });
  }

  public deleteById(id: Product['id']): Promise<Product | null> {
    return this.prismaService.product.delete({
      where: { id },
    });
  }
}
