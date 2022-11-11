import { Controller, Param, Get, ParseIntPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { DateDto } from './dto/car-check.dto';
import { ReportDto } from './dto/report-cars.dto';

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

  @Get('/report/:year/:month')
  carsReport(@Param() reportDto: ReportDto): Promise<any[] | any> {
    return this.carsService.carsReport(reportDto);
  }
}
