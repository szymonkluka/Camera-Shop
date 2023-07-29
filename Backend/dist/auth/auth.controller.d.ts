import { AuthService } from './auth.service';
import { Users } from '@prisma/client';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginData: {
        username: string;
        password: string;
    }): Promise<{
        message: string;
        access_token?: undefined;
    } | {
        access_token: string;
        message?: undefined;
    }>;
    getAll(): Promise<Users[]>;
    register(userData: Omit<Users, 'id' | 'createdAt' | 'updatedAt'>): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        country: string;
        city: string;
        zip: string;
        street: string;
        apartmentNumber: string;
        telephone: string;
        email: string;
        username: string;
        password: string;
    } & {}>;
    deleteById(id: string): Promise<{
        message: string;
    }>;
}
