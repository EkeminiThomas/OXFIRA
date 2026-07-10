import { Injectable, Logger } from '@nestjs/common';
import { EmailService, OtpPurpose } from './interfaces/email-service.interface';

@Injectable()
export class ConsoleEmailService implements EmailService {
  private readonly logger = new Logger(ConsoleEmailService.name);

  async sendOtpEmail(
    to: string,
    otp: string,
    purpose: OtpPurpose,
  ): Promise<void> {
    this.logger.debug(`[${purpose}] OTP for ${to}: ${otp}`);
    return Promise.resolve();
  }
}
