import { Controller, Param, Get, ParseIntPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { DateDto } from './dto/car-check.dto';

@Controller()
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get('/car/:id/:start/:end/free')
  checkAvailability(
    @Param('id', ParseIntPipe) id: number,
    @Param() dateDto: DateDto,
  ): Promise<string> {
    return this.carsService.checkAvailability(id, dateDto);
  }
}
