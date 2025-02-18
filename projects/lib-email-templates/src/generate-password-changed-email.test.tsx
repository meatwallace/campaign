import { test, expect } from 'vitest';
import { generatePasswordChangedEmail } from './generate-password-changed-email.tsx';

test('it generates a password changed email with the provided configuration', async () => {
  const config = {
    email: 'test@example.com',
  };

  const { html, plainText } = await generatePasswordChangedEmail(config);

  expect(html).include('Password Changed');
  expect(html).include('test@example.com');

  expect(plainText).include('PASSWORD CHANGED');
  expect(plainText).include('test@example.com');
});
