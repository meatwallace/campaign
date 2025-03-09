import { changePassword } from './change-password';
import { CreatePasswordResetToken } from './create-password-reset-token';
import { createSession } from './create-session';
import { createUser } from './create-user';
import { createVerification } from './create-verification';
import { deleteSession } from './delete-session';
import { deleteVerification } from './delete-verification';
import { get2FAVerificationURI } from './get-2fa-verification-uri';
import { getSession } from './get-session';
import { getSessions } from './get-sessions';
import { getUser } from './get-user';
import { getVerification } from './get-verification';
import { refreshTokens } from './refresh-tokens';
import { sendEmail } from './send-email';
import { updateVerification } from './update-verification';
import { verifyCode } from './verify-code';
import { verifyPassword } from './verify-password';

export const handlers = [
  // email
  sendEmail,

  // sessions
  createSession,
  deleteSession,
  getSession,
  getSessions,
  refreshTokens,

  // users
  changePassword,
  CreatePasswordResetToken,
  createUser,
  getUser,
  verifyPassword,

  // verifications
  createVerification,
  deleteVerification,
  get2FAVerificationURI,
  getVerification,
  updateVerification,
  verifyCode,
];
