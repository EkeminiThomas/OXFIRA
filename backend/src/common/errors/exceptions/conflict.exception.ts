import { HttpStatus } from '@nestjs/common';
import { AppException } from '../app.exception';
import { ErrorCode } from '../error-codes.enum';

export class ConflictException extends AppException {
  constructor(message: string) {
    super(ErrorCode.CONFLICT, message, HttpStatus.CONFLICT);
  }
}