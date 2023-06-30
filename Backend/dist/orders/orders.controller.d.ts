import { OrdersService } from './orders.service';
import { Order } from '.prisma/client';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    getAll(): any;
    getById(id: string): Promise<{
        id: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        totalPrice: number;
        firstName: string;
        lastName: string;
        country: string;
        city: string;
        zip: string;
        street: string;
        apartmentNumber: string;
        paymentType: string;
        cardName: string;
        cardNumber: string;
        cardExpiration: string;
        cardCVV: string;
        comment: string;
        telephone: string;
    } & {}>;
    create(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<{
        id: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        totalPrice: number;
        firstName: string;
        lastName: string;
        country: string;
        city: string;
        zip: string;
        street: string;
        apartmentNumber: string;
        paymentType: string;
        cardName: string;
        cardNumber: string;
        cardExpiration: string;
        cardCVV: string;
        comment: string;
        telephone: string;
    } & {}>;
    deleteById(id: string): Promise<{
        message: string;
    }>;
}
