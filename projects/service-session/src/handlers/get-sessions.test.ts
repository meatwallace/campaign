import { expect, test } from 'vitest';
import { createId } from '@paralleldrive/cuid2';
import * as schema from '@vers/postgres-schema';
import { createTestDB, createTestUser } from '@vers/service-test-utils';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { router } from '../router';
import { t } from '../t';

const createCaller = t.createCallerFactory(router);

interface TestConfig {
  db: PostgresJsDatabase<typeof schema>;
}

async function setupTest(config: TestConfig) {
  const caller = createCaller({ db: config.db });

  const user = await createTestUser({ db: config.db });

  return { caller, user };
}

test('it returns all sessions for the user', async () => {
  await using handle = await createTestDB();

  const { db } = handle;

  const { caller, user } = await setupTest({ db });

  const now = new Date();
  const sessionID1 = createId();
  const sessionID2 = createId();

  await db.insert(schema.sessions).values([
    {
      createdAt: now,
      expiresAt: new Date(now.getTime() + 24 * 60 * 60 * 1000),
      id: sessionID1,
      ipAddress: '127.0.0.1',
      refreshToken: 'refresh-token-1',
      updatedAt: now,
      userID: user.id,
    },
    {
      createdAt: now,
      expiresAt: new Date(now.getTime() + 24 * 60 * 60 * 1000),
      id: sessionID2,
      ipAddress: '127.0.0.2',
      refreshToken: 'refresh-token-2',
      updatedAt: now,
      userID: user.id,
    },
  ]);

  const result = await caller.getSessions({
    userID: user.id,
  });

  expect(result).toHaveLength(2);
  expect(result).toStrictEqual([
    {
      createdAt: expect.any(Date),
      expiresAt: expect.any(Date),
      id: sessionID1,
      ipAddress: '127.0.0.1',
      refreshToken: 'refresh-token-1',
      updatedAt: expect.any(Date),
      userID: user.id,
    },
    {
      createdAt: expect.any(Date),
      expiresAt: expect.any(Date),
      id: sessionID2,
      ipAddress: '127.0.0.2',
      refreshToken: 'refresh-token-2',
      updatedAt: expect.any(Date),
      userID: user.id,
    },
  ]);
});

test('it returns an empty array if the user has no sessions', async () => {
  await using handle = await createTestDB();

  const { db } = handle;

  const { caller, user } = await setupTest({ db });

  const result = await caller.getSessions({
    userID: user.id,
  });

  expect(result).toHaveLength(0);
  expect(result).toStrictEqual([]);
});
