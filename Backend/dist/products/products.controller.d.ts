import { ProductsService } from './products.service';
import { Product } from '.prisma/client';
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    getAll(): any;
    getById(id: string): Promise<{
        id: string;
        name: string;
        price: number;
        description: string;
        createdAt: Date;
        updatedAt: Date;
    } & {}>;
    updateById(id: string, productData: Partial<Product>): Promise<{
        id: string;
        name: string;
        price: number;
        description: string;
        createdAt: Date;
        updatedAt: Date;
    } & {}>;
    create(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<{
        id: string;
    }>;
    deleteById(id: string): Promise<{
        message: string;
    }>;
}
