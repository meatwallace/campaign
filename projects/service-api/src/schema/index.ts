import { builder } from './builder';

export const schema = builder.toSchema();

export { AuthPayload } from './types/auth-payload';
export { MutationError } from './types/mutation-error';
export { MutationErrorPayload } from './types/mutation-error-payload';
export { MutationSuccess } from './types/mutation-success';
export { User } from './types/user';

// auth
export { resolve as startEmailSignup } from './mutations/start-email-sign-up';
export { resolve as finishEmailSignup } from './mutations/finish-email-sign-up';
export { resolve as startPasswordReset } from './mutations/start-password-reset';
export { resolve as finishPasswordReset } from './mutations/finish-password-reset';
export { resolve as loginWithPassword } from './mutations/login-with-password';
export { resolve as finishLoginWith2FA } from './mutations/finish-login-with-2fa';
export { resolve as refreshAccessToken } from './mutations/refresh-access-token';
export { resolve as verifyOTP } from './mutations/verify-otp';

// 2fa
export { resolve as startEnable2FA } from './mutations/start-enable-2fa';
export { resolve as getEnable2FAVerification } from './queries/get-enable-2fa-verification';
export { resolve as finishEnable2FA } from './mutations/finish-enable-2fa';
export { resolve as startDisable2FA } from './mutations/start-disable-2fa';
export { resolve as finishDisable2FA } from './mutations/finish-disable-2fa';

// sessions
export { resolve as deleteSession } from './mutations/delete-session';
export { resolve as getSessions } from './queries/get-sessions';

// users
export { resolve as getCurrentUser } from './queries/get-current-user';

// worlds
export { resolve as createWorld } from './mutations/create-world';
export { resolve as deleteWorld } from './mutations/delete-world';
export { resolve as generateWorldNames } from './queries/generate-world-names';
export { resolve as getWorld } from './queries/get-world';
export { resolve as getWorlds } from './queries/get-worlds';
export { resolve as updateWorld } from './mutations/update-world';
