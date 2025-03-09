import { createId } from '@paralleldrive/cuid2';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import * as schema from '@vers/postgres-schema';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import path from 'node:path';
import postgres, { Sql } from 'postgres';

const TEST_TEMPLATE_DB = 'test_template';
const TEST_DB_USER = 'test';
const TEST_DB_PASSWORD = 'test';

interface PostgresTestConfig {
  migrationPath?: string;
  port: number;
}

interface IPostgresTestUtils {
  client: null | Sql;
  container: null | StartedPostgreSqlContainer;
  createTestDB: (config: PostgresTestConfig) => Promise<{
    db: PostgresJsDatabase<typeof schema>;
    teardown: () => Promise<void>;
  }>;
  db: null | PostgresJsDatabase<typeof schema>;
  initialize: (config: PostgresTestConfig) => Promise<void>;
  startContainer: (config: PostgresTestConfig) => Promise<void>;
  stopContainer: () => Promise<void>;
  teardown: () => Promise<void>;
  testDBClients: Map<string, Sql>;
}

export const PostgresTestUtils: IPostgresTestUtils = {
  client: null,
  container: null,
  async createTestDB(config: PostgresTestConfig) {
    if (!this.container) {
      this.container = await createPostgresContainer(config);
    }

    const defaultClient = createPostgresClient(this.container, 'postgres');

    const testDBID = createId();

    // create a new DB for this test from our pre-migrated template DB
    // for some reason we need to jump into unsafe mode otherwise `postgres` wont inline our params
    await defaultClient.unsafe(/* SQL */ `
      CREATE DATABASE test_${testDBID} TEMPLATE ${TEST_TEMPLATE_DB};
    `);

    console.log(`✔️ created test DB ${testDBID}`);

    await defaultClient.end();

    if (!this.client) {
      this.client = createPostgresClient(this.container, testDBID);
    }

    const testDBConnectionString = `postgres://${TEST_DB_USER}:${TEST_DB_PASSWORD}@${this.container.getHost()}:${this.container.getFirstMappedPort()}/test_${testDBID}`;
    const testDBClient = postgres(testDBConnectionString);
    const testDB = drizzle(testDBClient, { schema });

    // store a reference of the client so we can clean it up later
    this.testDBClients.set(testDBID, testDBClient);

    const teardown = async () => {
      await testDBClient.end();

      this.testDBClients.delete(testDBID);
    };

    return { db: testDB, teardown };
  },
  db: null,
  async initialize(config: PostgresTestConfig) {
    if (this.container) {
      throw new Error('Container already exists');
    }

    this.container = await createPostgresContainer(config);
  },
  async startContainer(config: PostgresTestConfig) {
    if (!this.container) {
      this.container = await createPostgresContainer(config);
    }

    if (!this.client) {
      this.client = createPostgresClient(this.container, TEST_TEMPLATE_DB);
    }

    if (!this.db) {
      this.db = drizzle(this.client, { schema });
    }

    const migrationPath =
      config.migrationPath ??
      path.join(process.cwd(), '../db-postgres/migrations');

    await migrate(this.db, { migrationsFolder: migrationPath });

    // tear down client connection to the template DB
    await this.client.end();
  },
  async stopContainer() {
    if (!this.container) {
      throw new Error('Container not initialized');
    }

    await this.container.stop();
  },
  async teardown() {
    if (this.client) {
      await this.client.end();
    }

    // loop over any remaining db clients and end their connection
    for (const client of this.testDBClients.values()) {
      await client.end();
    }
  },
  testDBClients: new Map(),
};

async function createPostgresContainer(
  config: PostgresTestConfig,
): Promise<StartedPostgreSqlContainer> {
  return await new PostgreSqlContainer('postgres:16.2-alpine3.19')
    .withDatabase(TEST_TEMPLATE_DB)
    .withUsername(TEST_DB_USER)
    .withPassword(TEST_DB_PASSWORD)
    // use a memory disk for perf
    .withTmpFs({ '/var/lib/pg/data': 'rw' })
    .withEnvironment({
      PGDATA: '/var/lib/pg/data',
    })
    .withExposedPorts({ container: 5432, host: config.port })
    // allow reusing our container across tests
    .withReuse()
    .start();
}

function createPostgresClient(
  container: StartedPostgreSqlContainer,
  database: string,
): Sql {
  const connectionString = `postgres://${TEST_DB_USER}:${TEST_DB_PASSWORD}@${container.getHost()}:${container.getFirstMappedPort()}/${database}`;

  return postgres(connectionString);
}
