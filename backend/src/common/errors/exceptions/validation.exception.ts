import { HttpStatus } from '@nestjs/common';
import { AppException } from '../app.exception';
import { ErrorCode } from '../error-codes.enum';

export class ValidationException extends AppException {
  constructor(message: string, details?: unknown) {
    super(ErrorCode.VALIDATION_ERROR, message, HttpStatus.BAD_REQUEST, details);
  }
}
