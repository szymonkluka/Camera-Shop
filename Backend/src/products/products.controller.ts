import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '.prisma/client';
import { ParseUUIDPipe } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) { }

  @Get('/')
  getAll(): any {
    return this.productsService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const prod = await this.productsService.getById(id);
    if (!prod) throw new NotFoundException('Product not found');
    return prod;
  }

  @Put('/:id')
  async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: Partial<Product>,
  ) {
    const updatedProduct = await this.productsService.updateById(
      id,
      productData,
    );
    if (!updatedProduct) throw new NotFoundException('Product not found');
    return updatedProduct;
  }

  @Post('/')
  async create(
    @Body() productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  ) {
    const createdProduct = await this.productsService.create(productData);
    return { id: createdProduct.id }; // Return the created product ID
  }

  @Delete('/:id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    const deletedProduct = await this.productsService.deleteById(id);
    if (!deletedProduct) throw new NotFoundException('Product not found');
    return { message: 'Product deleted successfully' };
  }
}
