import { Body, Controller, Post, Get, Delete, Param } from '@nestjs/common';
import { ImagesService } from './images.service';
import { Image } from '.prisma/client';
import { ParseUUIDPipe } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) { }
  @Get('/')
  getAll(): any {
    return this.imagesService.getAll();
  }

  @Post('/')
  create(@Body() imageData: Omit<Image, 'id'>): Promise<Image> {
    return this.imagesService.create(imageData);
  }

  @Delete('/:id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    const deletedProduct = await this.imagesService.deleteById(id);
    if (!deletedProduct) throw new NotFoundException('Product not found');
    return { message: 'Image deleted successfully' };
  }
}
