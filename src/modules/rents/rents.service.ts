import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Rent } from 'src/entities/rent.entity';
import { checkWeekDay } from 'src/helpers/date.helper';
import { calculateRentPrice } from 'src/helpers/price.helper';
import { CreateRentDto } from './dto/add-rent.dto';
import { CarsService } from '../cars/cars.service';
import { Contract } from 'src/entities/rent.entity';

@Injectable()
export class RentsService {
  constructor(
    private databaseService: DatabaseService,
    private carsService: CarsService,
  ) {}
  async getAllRents(): Promise<Rent[]> {
    const res = this.databaseService.executeQuery(`SELECT * FROM rents`);
    return res;
  }

  async rentCar(
    car_id: number,
    createRentDto: CreateRentDto,
  ): Promise<Rent[] | Contract> {
    const { start, end } = createRentDto;
    const price = calculateRentPrice(start, end);

    if (checkWeekDay(start, end)) {
      throw new BadRequestException(
        'Renting start and end dates cannot land on Saturday or Sunday.',
      );
    }
    if (typeof price !== 'number') {
      throw new BadRequestException(price);
    }

    const isAvailable = await this.carsService.checkAvailability(
      car_id,
      createRentDto,
    );

    if (isAvailable === 'NO')
      throw new BadRequestException(
        'Car is not available at requested time period',
      );
    if (isAvailable === 'ID does not exist.')
      throw new BadRequestException('Car with such ID does not exist.');

    const res = await this.databaseService.executeQuery(
      `INSERT INTO rents("startdate", "lastdate", "car_id", "rent_price")
       VALUES('${start}', '${end}', ${car_id}, ${price});
      `,
    );

    return res
      ? {
          Response:
            'Your Lease Contract has been confirmed successfully! View contract info here:',
          Car_ID: car_id,
          Rent_Period: `${start} - ${end}`,
          Total_Price: `$ ${price}`,
        }
      : { Response: 'Something went wrong...Unsuccessful' };
  }
}
