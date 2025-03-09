import { drop } from '@mswjs/data';
import { db } from '~/mocks/db';
import { createMockGQLContext } from '~/test-utils/create-mock-gql-context';
import { createPendingTransaction } from '~/utils/create-pending-transaction';
import { createTransactionToken } from '~/utils/create-transaction-token';
import { VerificationType } from '../types/verification-type';
import { resolveVerificationType } from '../utils/resolve-verification-type';
import { resolve } from './finish-disable-2fa';

afterEach(() => {
  drop(db);
});

test('it successfully disables 2FA with a valid transaction token', async () => {
  const user = db.user.create({
    email: 'test@example.com',
  });

  const session = db.session.create({
    userID: user.id,
  });

  const verification = db.verification.create({
    algorithm: 'SHA-1',
    charSet: 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789',
    digits: 6,
    id: 'verification-id',
    period: 30,
    secret: 'ABCDEFGHIJKLMNOP',
    target: user.email,
    type: '2fa',
  });

  const ctx = createMockGQLContext({ session, user });

  const transactionID = createPendingTransaction({
    action: VerificationType.TWO_FACTOR_AUTH_DISABLE,
    ipAddress: ctx.ipAddress,
    sessionID: session.id,
    target: user.email,
  });

  const transactionToken = await createTransactionToken(
    {
      action: VerificationType.TWO_FACTOR_AUTH_DISABLE,
      ipAddress: ctx.ipAddress,
      sessionID: session.id,
      target: user.email,
      transactionID,
    },
    ctx,
  );

  const args = {
    input: {
      transactionToken,
    },
  };

  const result = await resolve({}, args, ctx);

  expect(result).toEqual({ success: true });

  const deletedVerification = db.verification.findFirst({
    where: {
      id: { equals: verification.id },
    },
  });

  expect(deletedVerification).toBeNull();
});

test('it returns an error with an invalid transaction token', async () => {
  const user = db.user.create({
    email: 'test@example.com',
  });

  db.verification.create({
    algorithm: 'SHA-1',
    charSet: 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789',
    digits: 6,
    id: 'verification-id',
    period: 30,
    secret: 'ABCDEFGHIJKLMNOP',
    target: user.email,
    type: resolveVerificationType(VerificationType.TWO_FACTOR_AUTH),
  });

  const ctx = createMockGQLContext({ user });

  const args = {
    input: {
      transactionToken: 'invalid-token',
    },
  };

  const result = await resolve({}, args, ctx);

  expect(result).toEqual({
    error: {
      message: 'An unknown error occurred',
      title: 'An unknown error occurred',
    },
  });
});

test('it returns an error if 2FA is not enabled', async () => {
  const user = db.user.create({
    email: 'test@example.com',
  });

  const ctx = createMockGQLContext({ user });

  const args = {
    input: {
      transactionToken: 'valid-token',
    },
  };

  const result = await resolve({}, args, ctx);

  expect(result).toEqual({
    error: {
      message: 'An unknown error occurred',
      title: 'An unknown error occurred',
    },
  });
});
