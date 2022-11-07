import { Controller, Param, Get, ParseIntPipe } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller()
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get('/car/:id/free')
  checkAvailability(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.carsService.checkAvailability(id);
  }
}
