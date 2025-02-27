import { test, expect } from 'vitest';
import * as jose from 'jose';
import { env } from '../env';
import { createJWT } from './create-jwt';

test('it creates a valid JWT with correct claims', async () => {
  const data = {
    userID: 'user-123',
    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
  };

  const jwt = await createJWT(data);

  const publicKey = await jose.importPKCS8(env.JWT_SIGNING_SECRET, 'RS256');

  const { payload, protectedHeader } = await jose.jwtVerify(jwt, publicKey, {
    issuer: env.API_IDENTIFIER,
    audience: env.API_IDENTIFIER,
  });

  expect(protectedHeader).toMatchObject({
    alg: 'RS256',
  });

  expect(payload).toMatchObject({
    iss: env.API_IDENTIFIER,
    aud: env.API_IDENTIFIER,
    sub: data.userID,
    iat: expect.any(Number),
    exp: Number.parseInt(data.expiresAt.getTime().toString().slice(0, 10)),
  });
});
