import { Controller, Post, Get, Body, Delete, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from '@prisma/client';
import { ParseUUIDPipe } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('login')
  async login(@Body() loginData: { username: string; password: string }) {
    console.log('Received login request:', loginData);

    const { username, password } = loginData;
    const response = await this.authService.login(username, password);

    if ('message' in response) {
      console.log('Authentication failed:', response.message);
      return response;
    }

    console.log('User found and authenticated:', response);
    return response;
  }

  @Get('/')
  getAll(): Promise<Users[]> {
    return this.authService.getAllUsers();
  }

  @Post('register')
  async register(
    @Body() userData: Omit<Users, 'id' | 'createdAt' | 'updatedAt'>,
  ) {
    return this.authService.createUser(userData);
  }

  @Delete('/:id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    const deletedUser = await this.authService.deleteUserById(id);
    if (!deletedUser) throw new NotFoundException('user not found');
    return { message: 'User deleted successfully' };
  }
}