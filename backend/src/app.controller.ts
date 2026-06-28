import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('error')
  getError(): string {
    return this.appService.getError();
  }

  @Get('count')
  async getCount(): Promise<number> {
    return this.appService.getCount();
  }
}
