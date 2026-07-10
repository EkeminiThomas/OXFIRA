import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class VerifyEmailDto {
  @IsString()
  email!: string;

  @IsString()
  @Length(6, 6)
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.toUpperCase() : String(value),
  )
  otp!: string;
}
