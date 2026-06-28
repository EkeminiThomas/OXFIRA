import { Injectable } from '@nestjs/common';
import { ConflictException } from './common/errors/exceptions';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getError(): string {
    throw new ConflictException('test conflict');
  }
}
