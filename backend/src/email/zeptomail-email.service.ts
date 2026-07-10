import { Injectable, Logger } from '@nestjs/common';
import { env } from '../config/env';
import { EmailService, OtpPurpose } from './interfaces/email-service.interface';
import { buildOtpEmail } from './templates/otp-email.template';

const ZEPTOMAIL_API_URL = 'https://api.zeptomail.com/v1.1/email';

@Injectable()
export class ZeptoMailEmailService implements EmailService {
  private readonly logger = new Logger(ZeptoMailEmailService.name);

  async sendOtpEmail(
    to: string,
    otp: string,
    purpose: OtpPurpose,
  ): Promise<void> {
    const { subject, htmlBody } = buildOtpEmail(otp, purpose);

    const response = await fetch(ZEPTOMAIL_API_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Zoho-enczapikey ${env.ZEPTOMAIL_TOKEN}`,
      },
      body: JSON.stringify({
        from: {
          address: env.EMAIL_FROM_ADDRESS,
          name: env.EMAIL_FROM_NAME,
        },
        to: [{ email_address: { address: to } }],
        subject,
        htmlbody: htmlBody,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      this.logger.error(
        `ZeptoMail send failed (${response.status}) for ${purpose} to ${to}: ${body}`,
      );
      throw new Error('Email delivery failed');
    }
  }
}
