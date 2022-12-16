import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getCars(offset: number): Promise<any> {
    const res = await this.databaseService.executeQuery(
      `SELECT * FROM cars ORDER BY id LIMIT 200 OFFSET ${offset}`,
    );
    return res;
  }

  async addCar(createCarDto): Promise<any> {
    if (!createCarDto) {
      return 'Invalid values.';
    }

    const query = createCarDto.map(
      (item) => `('${item.name}', '${item.license_plate}')`,
    );
    const res = await this.databaseService.executeQuery(
      `INSERT INTO cars (name, license_plate)
        VALUES ${query}
      `,
    );

    return res
      ? 'Successfully added new car(s).'
      : 'Something went wrong...Try again later';
  }
}
