import { ConfigService } from '@nestjs/config';
import 'dotenv/config';
import { Int32 } from 'typeorm';

const configService = new ConfigService();

export default () => ({
  database: {
    name: 'default',
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<Int32>('DB_PORT'),
    username: configService.get<string>('DB_USER'),
    database: configService.get<string>('DB_DATABASE'),
    password: String(configService.get<string>('DB_PASSWORD')),
    entities: [
      __dirname + '/../model/**/*.entity.ts',
      __dirname + '/../model/**/*.entity.js',
    ],
    migrations: [__dirname + '/../migration/*{.ts,.js}'],
    synchronize: false,
    logging: true,
    migrationsRun: true,
    autoLoadEntities: true,
  },
});
