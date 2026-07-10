import { OtpPurpose } from '../interfaces/email-service.interface';

interface OtpEmailContent {
  subject: string;
  htmlBody: string;
}

const PURPOSE_COPY: Record<
  OtpPurpose,
  { subject: string; heading: string; line: string }
> = {
  [OtpPurpose.EMAIL_VERIFICATION]: {
    subject: 'Verify your OXFIRA account',
    heading: 'Confirm your email',
    line: 'Use this code to verify your email address:',
  },
  [OtpPurpose.PASSWORD_RESET]: {
    subject: 'Reset your OXFIRA password',
    heading: 'Password reset requested',
    line: 'Use this code to reset your password:',
  },
};

export function buildOtpEmail(
  otp: string,
  purpose: OtpPurpose,
): OtpEmailContent {
  const copy = PURPOSE_COPY[purpose];

  return {
    subject: copy.subject,
    htmlBody: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #111;">${copy.heading}</h2>
        <p style="color: #444;">${copy.line}</p>
        <div style="font-size: 32px; letter-spacing: 8px; font-weight: bold; padding: 16px 24px; background: #f4f4f4; border-radius: 8px; text-align: center; margin: 24px 0;">
          ${otp}
        </div>
        <p style="color: #888; font-size: 13px;">
          This code expires in 10 minutes. If you didn't request it, you can safely ignore this email.
        </p>
      </div>
    `,
  };
}
