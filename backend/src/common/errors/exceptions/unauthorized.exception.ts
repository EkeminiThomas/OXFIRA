import { HttpStatus } from '@nestjs/common';
import { AppException } from '../app.exception';
import { ErrorCode } from '../error-codes.enum';

export class UnauthorizedException extends AppException {
  constructor(message = 'Unauthorized') {
    super(ErrorCode.UNAUTHORIZED, message, HttpStatus.UNAUTHORIZED);
  }
}
