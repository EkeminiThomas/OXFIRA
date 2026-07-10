import { Global, Module } from '@nestjs/common';
import { EMAIL_SERVICE } from './interfaces/email-service.interface';
import { env } from '../config/env';
import { ZeptoMailEmailService } from './zeptomail-email.service';
import { ConsoleEmailService } from './console-email.service';

@Global()
@Module({
  providers: [
    {
      provide: EMAIL_SERVICE,
      useClass:
        env.EMAIL_PROVIDER === 'zeptomail'
          ? ZeptoMailEmailService
          : ConsoleEmailService,
    },
  ],
  exports: [EMAIL_SERVICE],
})
export class EmailModule {}
