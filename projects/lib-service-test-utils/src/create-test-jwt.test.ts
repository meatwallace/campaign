import { createTestJWT } from './create-test-jwt';

test('it creates a valid JWT with the provided configuration', async () => {
  const userID = 'test-user-id';
  const audience = 'test.com';
  const issuer = 'https://test.com';

  const jwt = await createTestJWT({
    audience,
    issuer,
    sub: userID,
  });

  expect(jwt).toBeDefined();
  expect(typeof jwt).toBe('string');
});
