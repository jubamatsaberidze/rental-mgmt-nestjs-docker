import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CarsService {
  async checkAvailability(id: number): Promise<boolean> {
    if (typeof id !== 'number' || id > 5 || id < 0) {
      throw new BadRequestException('Invalid ID parameter.');
    }
    const req = new DatabaseService();
    const res = await req.executeQuery(
      `SELECT * FROM rents WHERE car_id = ${id} AND EXISTS (SELECT * FROM cars WHERE cars.id = rents.car_id)`,
    );

    return Boolean(res.length);
  }
}
