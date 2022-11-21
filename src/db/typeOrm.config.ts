import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5434,
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: [configService.get('TYPEORM_ENTITIES_DIR')],
  synchronize: false,
  migrations: [configService.get('TYPEORM_MIGRATIONS_DIR')],
});

export default appDataSource;
