import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from './error-codes.enum';

export class AppException extends HttpException {
  public readonly code: ErrorCode;
  public readonly details?: unknown;

  constructor(
    code: ErrorCode,
    message: string,
    status: HttpStatus,
    details?: unknown,
  ) {
    super(message, status);
    this.code = code;
    this.details = details;
  }
}