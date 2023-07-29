import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/shared/services/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      secret: '1', // Replace with your actual secret key
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, PrismaService], // Add PrismaClient to the providers array
  controllers: [AuthController],
})
export class AuthModule { }