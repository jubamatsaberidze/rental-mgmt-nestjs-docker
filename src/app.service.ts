import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getCars(): Promise<any> {
    const res = this.databaseService.executeQuery(`SELECT * FROM cars`);
    return res;
  }

  async addCar(createCarDto): Promise<any> {
    const parsedArray = JSON.stringify(createCarDto);
    if (!createCarDto) {
      return 'Invalid values.';
    }
    const res = await this.databaseService.executeQuery(
      `INSERT INTO cars (name, license_plate)
        SELECT
        e ->> 'name',
        (e ->> 'license_plate')
        FROM jsonb_array_elements('${parsedArray}') AS t(e)
      `,
    );

    return res
      ? 'Successfully added new car.'
      : 'Something went wrong...Try again later';
  }
}
