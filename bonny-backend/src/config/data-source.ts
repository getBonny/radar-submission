import { DataSource, DataSourceOptions } from 'typeorm';
import databaseConfig from './database-config';
import {
  AuthTypes,
  Connector,
  IpAddressTypes,
} from '@google-cloud/cloud-sql-connector';

export const AppDataSource = (async () => {
  const conf: DataSourceOptions = databaseConfig()
    .database as DataSourceOptions;

  if (process.env.DB_IN_GCLOUD == 'true') {
    const clientOpts = await new Connector().getOptions({
      instanceConnectionName: 'locards-bonny-test:europe-west3:bonny-test-db',
      ipType: IpAddressTypes.PUBLIC,
      authType: AuthTypes.PASSWORD,
    });
    return new DataSource({
      ...conf,
      extra: {
        ...clientOpts,
      },
    });
  } else {
    return new DataSource(conf);
  }
})();
