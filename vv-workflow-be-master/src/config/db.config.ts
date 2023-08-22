import { Sequelize, Dialect } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

interface DBConfig {
  name?: string;
  username?: string;
  password?: string;
  host?: string;
  port?: string;
  dialect?: Dialect;
}

const dbConfig: DBConfig = {
  name: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT as Dialect, // Type assertion to Dialect
};
const sequelize = new Sequelize( dbConfig?.name || '', dbConfig?.username || '', dbConfig?.password || '', {
  host: dbConfig?.host || '',
  port: dbConfig?.port ? Number( dbConfig?.port ) : undefined,
  dialect: dbConfig?.dialect || 'mysql', // Providing a default value of 'mysql'
  pool: { min: 0, max: 5, idle: 10000 },
  logging: false,
} );

export { sequelize };
