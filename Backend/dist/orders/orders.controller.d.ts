import { OrdersService } from './orders.service';
import { Order } from '.prisma/client';
import { EmailService } from '../shared/services/email.service';
export declare class OrdersController {
    private ordersService;
    private emailService;
    constructor(ordersService: OrdersService, emailService: EmailService);
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
        email: string;
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
        email: string;
    } & {}>;
    sendOrderEmail(emailData: {
        email: string;
        orderData: any;
    }): Promise<{
        message: string;
    }>;
    deleteById(id: string): Promise<{
        message: string;
    }>;
}
