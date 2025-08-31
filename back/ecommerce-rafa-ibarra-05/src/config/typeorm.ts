import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env' });
import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
console.log('🔑 DB_PASSWORD from env:', process.env.DB_PASSWORD);

console.log(
  '✅ DB_PASSWORD:',
  process.env.DB_PASSWORD,
  typeof process.env.DB_PASSWORD,
);

const config: DataSourceOptions = {
  type: 'postgres',
  host: `${process.env.DB_HOST}`,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  database: `${process.env.DB_NAME}`,
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  synchronize: process.env.DB_SYNC === 'true',
  logging: process.env.DB_LOGGING === 'true',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
};

export default registerAs('database', () => ({ ...config }));
export const connectionSource = new DataSource(config);
