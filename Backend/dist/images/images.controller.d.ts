import { ImagesService } from './images.service';
import { Image } from '.prisma/client';
export declare class ImagesController {
    private imagesService;
    constructor(imagesService: ImagesService);
    getAll(): any;
    create(imageData: Omit<Image, 'id'>): Promise<Image>;
    deleteById(id: string): Promise<{
        message: string;
    }>;
}
