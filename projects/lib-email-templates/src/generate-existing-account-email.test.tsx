import { expect, test } from 'vitest';
import { generateExistingAccountEmail } from './generate-existing-account-email.tsx';

test('it generates an existing account email with the provided configuration', async () => {
  const config = {
    email: 'test@example.com',
  };

  const { html, plainText } = await generateExistingAccountEmail(config);

  expect(html).include('You Already Have an Account');
  expect(html).include('test@example.com');
  expect(html).include('https://vers.com/forgot-password');

  expect(plainText).include('YOU ALREADY HAVE AN ACCOUNT');
  expect(plainText).include('test@example.com');
  expect(plainText).include('https://vers.com/forgot-password');
});
