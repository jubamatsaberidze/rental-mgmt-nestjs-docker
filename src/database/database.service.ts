import { Injectable, Logger } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);
  private pool: any;

  constructor() {
    this.pool = new Pool({
      user: process.env.DATABASE_USERNAME,
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      port: parseInt(process.env.DATABASE_PORT),
    });
  }

  async executeQuery(queryText: string, values: any[] = []): Promise<any[]> {
    this.logger.debug(`Executing SQL query: ${queryText} (${values})`);
    return this.pool.query(queryText, values).then((res: QueryResult) => {
      this.logger.debug(`Executed query, result size ${res.rows.length}`);
      return res.rows;
    });
  }
}
