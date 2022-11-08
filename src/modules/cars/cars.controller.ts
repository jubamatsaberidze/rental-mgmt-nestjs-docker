import { Controller, Param, Get, ParseIntPipe } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller()
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get('/car/:id/:start/:end/free')
  checkAvailability(
    @Param('id', ParseIntPipe) id: number,
    @Param('start') start: string,
    @Param('end') end: string,
  ): Promise<boolean> {
    return this.carsService.checkAvailability(id, start, end);
  }
}
