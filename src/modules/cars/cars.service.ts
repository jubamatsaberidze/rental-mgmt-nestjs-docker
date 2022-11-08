import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { checkValidDate } from 'src/helpers/valiDate';

@Injectable()
export class CarsService {
  async checkAvailability(
    id: number,
    start: string,
    end: string,
  ): Promise<boolean> {
    if (!checkValidDate(start) || !checkValidDate(end) || start > end) {
      throw new BadRequestException('Enter valid dates.');
    }
    const req = new DatabaseService();
    const idExists = await req.executeQuery(
      `SELECT * FROM cars WHERE id = ${id}`,
    );
    if (!idExists.length) {
      throw new BadRequestException('ID does not exist.');
    }
    const res = await req.executeQuery(
      `SELECT * FROM rents 
       WHERE car_id = ${id} AND ('${start}' <= DATE(lastdate) + INTERVAL '3 day') AND ('${end}' >= startdate)
      `,
    );

    return !Boolean(res.length);
  }
}
