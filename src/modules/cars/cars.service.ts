import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CarsService {
  async checkAvailability(id: number): Promise<boolean> {
    const req = new DatabaseService();
    const idExists = await req.executeQuery(
      `SELECT * FROM cars WHERE id = ${id}`,
    );
    if (!idExists.length) {
      throw new BadRequestException('ID does not exist.');
    }
    const res = await req.executeQuery(
      `SELECT * FROM rents WHERE car_id = ${id}`,
    );

    return !Boolean(res.length);
  }
}
