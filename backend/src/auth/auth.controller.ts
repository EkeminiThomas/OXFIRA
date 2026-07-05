import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { RequestResetDto, ConfirmResetDto } from './dto/reset-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto.refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(
    @CurrentUser('id') userId: string,
    @Headers('authorization') authHeader: string,
    @Body() dto: RefreshTokenDto,
  ) {
    const accessToken = authHeader.replace('Bearer ', '');
    await this.authService.logout(accessToken, userId, dto.refreshToken);
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  async verifyEmail(@Body() dto: VerifyEmailDto) {
    await this.authService.verifyEmail(dto.email, dto.otp);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async requestReset(@Body() dto: RequestResetDto) {
    await this.authService.requestPasswordReset(dto.email);
  }

  @Post('reset-password/confirm')
  @HttpCode(HttpStatus.OK)
  async confirmReset(@Body() dto: ConfirmResetDto) {
    await this.authService.confirmPasswordReset(
      dto.email,
      dto.otp,
      dto.password,
    );
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser('id') userId: string) {
    return this.authService.getProfile(userId);
  }
}
