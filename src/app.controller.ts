import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/cars')
  getCars(): Promise<any> {
    return this.appService.getCars();
  }
}
