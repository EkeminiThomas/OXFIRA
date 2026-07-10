export enum OtpPurpose {
  EMAIL_VERIFICATION = 'email-verfication',
  PASSWORD_RESET = 'password-reset',
}

export interface EmailService {
  sendOtpEmail(to: string, otp: string, purpose: OtpPurpose): Promise<void>;
}

export const EMAIL_SERVICE = 'EMAIL_SERVICE';
