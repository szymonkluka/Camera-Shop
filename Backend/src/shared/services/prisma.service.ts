import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  userAccessor: any;

  async onModuleInit() {
    await this.$connect();
    this.userAccessor = this.users; // Assign the Prisma Client 'user' accessor to the 'userAccessor' property
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
