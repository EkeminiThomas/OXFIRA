import { HttpStatus } from '@nestjs/common';
import { AppException } from '../app.exception';
import { ErrorCode } from '../error-codes.enum';

export class NotFoundException extends AppException {
  constructor(message = 'Resource not found') {
    super(ErrorCode.NOT_FOUND, message, HttpStatus.NOT_FOUND);
  }
}
