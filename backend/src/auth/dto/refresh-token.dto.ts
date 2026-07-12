import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ example: 'ojnladfnldfoehfadklawqerqewr' })
  @IsString()
  refreshToken!: string;
}
