import { Injectable } from '@nestjs/common';
import { ConflictException } from './common/errors/exceptions';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  getError(): string {
    throw new ConflictException('test conflict');
  }

  async getCount(): Promise<number> {
    return this.prisma.user.count();
  }
}
