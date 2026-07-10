import {
  IsEmail,
  IsString,
  Length,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class RequestResetDto {
  @IsEmail()
  email!: string;
}

export class ConfirmResetDto {
  @IsEmail()
  email!: string;

  @IsString()
  @Length(6, 6)
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.toUpperCase() : String(value),
  )
  otp!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password!: string;
}
