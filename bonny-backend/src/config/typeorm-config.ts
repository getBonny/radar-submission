import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import {
  AuthTypes,
  Connector,
  IpAddressTypes,
} from '@google-cloud/cloud-sql-connector';
import { DataSource, DataSourceOptions, EventSubscriber } from 'typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return configService.get<DataSourceOptions>('database');
  },
  dataSourceFactory: async (options) => {
    if (process.env.DB_IN_GCLOUD == 'true') {
      const clientOpts = await new Connector().getOptions({
        instanceConnectionName: 'locards-bonny-test:europe-west3:bonny-test-db',
        ipType: IpAddressTypes.PUBLIC,
        authType: AuthTypes.PASSWORD,
      });
      const dataSource = new DataSource({
        ...options,
        extra: {
          ...clientOpts,
        },
      });
      await dataSource.initialize();
      return dataSource;
    } else {
      return new DataSource({ ...options, subscribers: [EventSubscriber] });
    }
  },
};
