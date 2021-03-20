import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join, resolve } from 'path';

const options: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'data/fdrive.db',
  entities: [resolve(__dirname, '..', 'entities', '*')],
  migrations: [resolve(__dirname, '..', 'migrations', '*')],
  cli: {
    entitiesDir: join('src', 'db', 'entities'),
    migrationsDir: join('src', 'db', 'migrations'),
  },
};

module.exports = options;
