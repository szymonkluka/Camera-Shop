import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client';
import { compare, hash } from 'bcrypt'; // Import the hash function from bcrypt

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) { }

  async createUser(
    userData: Omit<Users, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Users> {
    // Hash the password before storing it in the database
    const hashedPassword = await hash(userData.password, 10);

    // Save the hashed password in the user data
    const userDataWithHashedPassword = {
      ...userData,
      password: hashedPassword,
    };

    return this.prisma.users.create({ data: userDataWithHashedPassword });
  }

  async validateUser(username: string, inputPassword: string): Promise<any> {
    const user = await this.prisma.users.findUnique({ where: { username } });

    if (!user) {
      return null;
    }

    // Check if the stored hashed password matches the input password
    const isPasswordMatch = await compare(inputPassword, user.password);

    if (isPasswordMatch) {
      return user;
    }

    return null;
  }

  async getAllUsers(): Promise<Users[]> {
    return this.prisma.users.findMany();
  }

  async deleteUserById(id: string): Promise<Users> {
    return this.prisma.users.delete({ where: { id } });
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);

    if (!user) {
      console.log('Invalid credentials. User not found or password mismatch.');
      return { message: 'Invalid credentials' };
    }

    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}