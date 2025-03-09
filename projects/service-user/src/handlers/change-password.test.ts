import * as schema from '@vers/postgres-schema';
import { createTestUser, PostgresTestUtils } from '@vers/service-test-utils';
import bcrypt from 'bcryptjs';
import { Hono } from 'hono';
import invariant from 'tiny-invariant';
import { pgTestConfig } from '../pg-test-config';
import { changePassword } from './change-password';

interface TestConfig {
  user?: Partial<typeof schema.users.$inferInsert>;
}

async function setupTest(config: TestConfig = {}) {
  const app = new Hono();

  const { db, teardown } = await PostgresTestUtils.createTestDB(pgTestConfig);

  const user = await createTestUser({ db, user: config.user });

  app.post('/change-password', async (ctx) => changePassword(ctx, db));

  return { app, db, teardown, user };
}

test('it updates the password and clears the reset token for an existing user', async () => {
  const { app, db, teardown, user } = await setupTest({
    user: {
      passwordResetToken: 'test_reset_token',
      passwordResetTokenExpiresAt: new Date(Date.now() + 1000 * 60 * 10),
    },
  });

  const req = new Request('http://localhost/change-password', {
    body: JSON.stringify({
      id: user.id,
      password: 'newpassword123',
      resetToken: 'test_reset_token',
    }),
    method: 'POST',
  });

  const res = await app.request(req);
  const body = await res.json();

  expect(res.status).toBe(200);
  expect(body).toMatchObject({
    success: true,
  });

  const updatedUser = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, user.id),
  });

  invariant(
    typeof updatedUser?.passwordHash === 'string',
    'updated user password hash must set',
  );

  expect(
    await bcrypt.compare('newpassword123', updatedUser.passwordHash),
  ).toBeTrue();

  expect(updatedUser.passwordResetToken).toBeNull();
  expect(updatedUser.passwordResetTokenExpiresAt).toBeNull();

  await teardown();
});

test('it returns an error if the user does not exist', async () => {
  const { app, teardown } = await setupTest();

  const req = new Request('http://localhost/change-password', {
    body: JSON.stringify({
      id: 'nonexistent_id',
      password: 'newpassword123',
      resetToken: 'test_reset_token',
    }),
    method: 'POST',
  });

  const res = await app.request(req);
  const body = await res.json();

  expect(res.status).toBe(200);
  expect(body).toMatchObject({
    error: 'User not found',
    success: false,
  });

  await teardown();
});

test('it returns an error if the reset token is invalid', async () => {
  const { app, teardown } = await setupTest();

  const req = new Request('http://localhost/change-password', {
    body: JSON.stringify({
      id: 'test_id',
      password: 'newpassword123',
      resetToken: 'invalid_reset_token',
    }),
    method: 'POST',
  });

  const res = await app.request(req);
  const body = await res.json();

  expect(res.status).toBe(200);
  expect(body).toMatchObject({
    error: 'Invalid reset token',
    success: false,
  });

  await teardown();
});

test('it returns an error if the reset token has expired', async () => {
  const { app, teardown, user } = await setupTest({
    user: {
      passwordResetToken: 'test_reset_token',
      passwordResetTokenExpiresAt: new Date(Date.now() - 1000 * 60 * 10),
    },
  });

  const req = new Request('http://localhost/change-password', {
    body: JSON.stringify({
      id: user.id,
      password: 'newpassword123',
      resetToken: 'test_reset_token',
    }),
    method: 'POST',
  });

  const res = await app.request(req);
  const body = await res.json();

  expect(res.status).toBe(200);
  expect(body).toMatchObject({
    error: 'Reset token expired',
    success: false,
  });

  await teardown();
});

test('it returns an error for invalid request body', async () => {
  const { app, teardown } = await setupTest();

  const req = new Request('http://localhost/change-password', {
    body: 'invalid json',
    method: 'POST',
  });

  const res = await app.request(req);
  const body = await res.json();

  expect(res.status).toBe(200);
  expect(body).toMatchObject({
    error: 'An unknown error occurred',
    success: false,
  });

  await teardown();
});
