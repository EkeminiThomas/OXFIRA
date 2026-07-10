import { randomInt } from 'crypto';

const OTP_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

export function generateOtp(length = 6): string {
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += OTP_ALPHABET[randomInt(0, OTP_ALPHABET.length)];
  }
  return otp;
}
