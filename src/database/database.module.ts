import { Module, OnApplicationShutdown, Logger } from '@nestjs/common';
import { Pool } from 'pg';
import { DatabaseService } from './database.service';
import { ModuleRef } from '@nestjs/core';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule implements OnApplicationShutdown {
  private readonly logger = new Logger(DatabaseModule.name);

  constructor(private readonly moduleRef: ModuleRef) {}

  onApplicationShutdown(signal?: string): any {
    this.logger.log(`Shutting down on signal ${signal}`);
    const pool = this.moduleRef.get('DATABASE_POOL') as Pool;
    return pool.end();
  }
}
