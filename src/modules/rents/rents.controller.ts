import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { Contract, Rent } from 'src/entities/rent.entity';
import { RentsService } from './rents.service';
import { CreateRentDto } from './dto/add-rent.dto';

@Controller()
export class RentsController {
  constructor(private rentsService: RentsService) {}

  @Get('/rents')
  getAllRents(): Promise<Rent[]> {
    return this.rentsService.getAllRents();
  }

  @Post('/rent/:car_id')
  rentCar(
    @Param('car_id', ParseIntPipe) car_id: number,
    @Body() createRentDto: CreateRentDto,
  ): Promise<Rent[] | Contract> {
    return this.rentsService.rentCar(car_id, createRentDto);
  }
}
