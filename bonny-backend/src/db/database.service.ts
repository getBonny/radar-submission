import { Injectable } from '@nestjs/common';

import { drizzle } from 'drizzle-orm/postgres-js'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from './schema'
import * as postgres from 'postgres'

@Injectable()
export class dbService {

    public client: PostgresJsDatabase<typeof schema>;
    public schema = schema;

    constructor() {
        const connectionString = process.env.DATABASE_URL
        // Disable prefetch as it is not supported for "Transaction" pool mode
        const client = postgres(connectionString, { prepare: false })
        const db = drizzle(client, { schema });
        this.client = db;
    }

}
