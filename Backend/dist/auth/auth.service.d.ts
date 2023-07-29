import { PrismaService } from 'src/shared/services/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    createUser(userData: Omit<Users, 'id' | 'createdAt' | 'updatedAt'>): Promise<Users>;
    validateUser(username: string, inputPassword: string): Promise<any>;
    getAllUsers(): Promise<Users[]>;
    deleteUserById(id: string): Promise<Users>;
    login(username: string, password: string): Promise<{
        message: string;
        access_token?: undefined;
    } | {
        access_token: string;
        message?: undefined;
    }>;
}
