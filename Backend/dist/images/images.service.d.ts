import { Image } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';
export declare class ImagesService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getAll(): Promise<Image[]>;
    create(imageData: Omit<Image, 'id'>): Promise<Image>;
    deleteById(id: Image['id']): Promise<Image | null>;
}
