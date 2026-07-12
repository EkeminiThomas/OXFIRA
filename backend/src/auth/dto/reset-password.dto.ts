import {
  IsEmail,
  IsString,
  Length,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RequestResetDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email!: string;
}

export class ConfirmResetDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: '1A2B3C',
    minLength: 6,
    maxLength: 6,
    type: 'string',
  })
  @IsString()
  @Length(6, 6)
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.toUpperCase() : String(value),
  )
  otp!: string;

  @ApiProperty({ example: '****************', minLength: 8, maxLength: 128 })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password!: string;
}
