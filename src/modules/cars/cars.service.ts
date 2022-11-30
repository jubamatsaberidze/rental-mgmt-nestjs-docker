import * as dayjs from 'dayjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { DateDto } from './dto/car-check.dto';
import { dateDiff } from '../../helpers/date.helper';
import { checkWeekDay } from '../../helpers/date.helper';
import { ReportDto } from './dto/report-cars.dto';
import { report_query } from '../../constants/report.query';

@Injectable()
export class CarsService {
  constructor(private databaseService: DatabaseService) {}

  async checkAvailability(id: number, dateDto: DateDto): Promise<string> {
    const { start, end } = dateDto;
    if (dateDiff(start, end) > 30) {
      throw new BadRequestException('Enter valid date range.');
    }
    if (!dayjs(start).isValid() || !dayjs(end).isValid()) {
      throw new BadRequestException('Enter valid dates.');
    }
    if (checkWeekDay(start, end)) {
      throw new BadRequestException(
        'Rent start and end dates cannot be Saturday or Sunday.',
      );
    }
    const res = await this.databaseService.executeQuery(
      `SELECT
        (CASE 
          WHEN EXISTS (SELECT * FROM cars where cars.id = ${id}) = 'true'
          THEN (SELECT car_id FROM rents WHERE car_id = ${id} AND ('${start}' <= lastdate + INTERVAL '3 day') AND ('${end}' >= startdate - INTERVAL '3 day') LIMIT 1)
          ELSE (0)
        END) as answer
       FROM rents
       LIMIT 1
      `,
    );
    {
      return !res.length || res[0].answer === null
        ? 'YES'
        : res[0].answer === 0
        ? 'ID does not exist.'
        : 'NO';
    }
  }

  async carsReport(reportDto: ReportDto): Promise<any[] | any> {
    const { year, month } = reportDto;

    const query = report_query(year, month);
    const res = await this.databaseService.executeQuery(query);

    return res;
  }
}
