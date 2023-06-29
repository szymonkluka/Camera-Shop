import { Injectable } from '@nestjs/common';
import { Image } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class ImagesService {
  constructor(private prismaService: PrismaService) { }

  public getAll(): Promise<Image[]> {
    return this.prismaService.image.findMany();
  }

  public create(imageData: Omit<Image, 'id'>): Promise<Image> {
    return this.prismaService.image.create({
      data: imageData,
    });
  }
  public deleteById(id: Image['id']): Promise<Image | null> {
    return this.prismaService.image.delete({
      where: { id },
    });
  }
}
