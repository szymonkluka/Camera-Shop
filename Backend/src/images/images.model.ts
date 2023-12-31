import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { PrismaService } from '../shared/services/prisma.service';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, PrismaService],
})
export class ImagesModule { }