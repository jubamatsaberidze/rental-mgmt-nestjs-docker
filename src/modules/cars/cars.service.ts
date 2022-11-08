import * as dayjs from 'dayjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { DateDto } from './dto/car-check.dto';
import { dateDiff } from 'src/helpers/date.helper';

@Injectable()
export class CarsService {
  constructor(private databaseService: DatabaseService) {}
  async checkAvailability(id: number, dateDto: DateDto): Promise<boolean> {
    const { start, end } = dateDto;
    if (dateDiff(start, end) > 30) {
      throw new BadRequestException('Enter valid date range.');
    }
    if (!dayjs(start).isValid() || !dayjs(end).isValid()) {
      throw new BadRequestException('Enter valid dates.');
    }
    const idExists = await this.databaseService.executeQuery(
      `SELECT * FROM cars WHERE id = ${id}`,
    );
    if (!idExists.length) {
      throw new BadRequestException('ID does not exist.');
    }
    const res = await this.databaseService.executeQuery(
      `SELECT * FROM rents 
       WHERE car_id = ${id} AND ('${start}' <= lastdate + INTERVAL '3 day') AND ('${end}' >= startdate - INTERVAL '3 day')
      `,
    );

    return !Boolean(res.length);
  }
}
