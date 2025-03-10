import { expect, test } from 'vitest';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { createId } from '@paralleldrive/cuid2';
import * as schema from '@vers/postgres-schema';
import { createTestDB } from '@vers/service-test-utils';
import { router } from '../router';
import { t } from '../t';

const createCaller = t.createCallerFactory(router);

interface TestConfig {
  db: PostgresJsDatabase<typeof schema>;
}

function setupTest(config: TestConfig) {
  const caller = createCaller({ db: config.db });

  return { caller };
}

test('it returns a TOTP auth URI for a valid 2FA verification record', async () => {
  await using handle = await createTestDB();

  const { db } = handle;

  const { caller } = setupTest({ db });

  const verification = {
    algorithm: 'SHA-1',
    charSet: 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789',
    createdAt: new Date(),
    digits: 6,
    expiresAt: null,
    id: createId(),
    period: 30,
    secret: 'ABCDEFGHIJKLMNOP',
    target: 'test@example.com',
    type: '2fa-setup',
  } as const;

  await db.insert(schema.verifications).values(verification);

  const result = await caller.get2FAVerificationURI({
    target: 'test@example.com',
  });

  expect(result).toStrictEqual({
    otpURI: expect.stringContaining('otpauth://totp/vers:test%40example.com'),
  });
});

test('it throws an error for non-existent 2FA verification record', async () => {
  await using handle = await createTestDB();

  const { db } = handle;

  const { caller } = setupTest({ db });

  await expect(
    caller.get2FAVerificationURI({
      target: 'test@example.com',
    }),
  ).rejects.toMatchObject({
    code: 'BAD_REQUEST',
    message: 'No 2FA verification found for this target',
  });
});
