/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation VerifyOTP($input: VerifyOTPInput!) {\n    verifyOTP(input: $input) {\n      ... on TwoFactorSuccessPayload {\n        transactionToken\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n": typeof types.VerifyOtpDocument,
    "\n  query GetCurrentUser {\n    getCurrentUser {\n      id\n      username\n      name\n      email\n      is2FAEnabled\n    }\n  }\n": typeof types.GetCurrentUserDocument,
    "\n  mutation StartPasswordReset($input: StartPasswordResetInput!) {\n    startPasswordReset(input: $input) {\n      ... on MutationSuccess {\n        success\n      }\n\n      ... on TwoFactorRequiredPayload {\n        transactionID\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n": typeof types.StartPasswordResetDocument,
    "\n  mutation LoginWithPassword($input: LoginWithPasswordInput!) {\n    loginWithPassword(input: $input) {\n      ... on AuthPayload {\n        accessToken\n        refreshToken\n        session {\n          id\n          expiresAt\n        }\n      }\n\n      ... on TwoFactorRequiredPayload {\n        transactionID\n        sessionID\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n": typeof types.LoginWithPasswordDocument,
    "\n  mutation FinishEmailSignup($input: FinishEmailSignupInput!) {\n    finishEmailSignup(input: $input) {\n      ... on AuthPayload {\n        accessToken\n        refreshToken\n        session {\n          id\n          expiresAt\n        }\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n": typeof types.FinishEmailSignupDocument,
    "\n  mutation StartEnable2FA($input: StartEnable2FAInput!) {\n    startEnable2FA(input: $input) {\n      ... on TwoFactorRequiredPayload {\n        transactionID\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n": typeof types.StartEnable2FaDocument,
    "\n  mutation StartDisable2FA($input: StartDisable2FAInput!) {\n    startDisable2FA(input: $input) {\n      ... on TwoFactorRequiredPayload {\n        transactionID\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n": typeof types.StartDisable2FaDocument,
    "\n  query GetEnable2FAVerification {\n    getEnable2FAVerification {\n      otpURI\n    }\n  }\n": typeof types.GetEnable2FaVerificationDocument,
    "\n  mutation FinishEnable2FA($input: FinishEnable2FAInput!) {\n    finishEnable2FA(input: $input) {\n      ... on MutationSuccess {\n        success\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n": typeof types.FinishEnable2FaDocument,
    "\n  mutation FinishPasswordReset($input: FinishPasswordResetInput!) {\n    finishPasswordReset(input: $input) {\n      ... on MutationSuccess {\n        success\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n": typeof types.FinishPasswordResetDocument,
    "\n  mutation StartEmailSignup($input: StartEmailSignupInput!) {\n    startEmailSignup(input: $input) {\n      ... on TwoFactorRequiredPayload {\n        transactionID\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n": typeof types.StartEmailSignupDocument,
    "\n  mutation FinishDisable2FA($input: FinishDisable2FAInput!) {\n    finishDisable2FA(input: $input) {\n      ... on MutationSuccess {\n        success\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n": typeof types.FinishDisable2FaDocument,
    "\n  mutation FinishLoginWith2FA($input: FinishLoginWith2FAInput!) {\n    finishLoginWith2FA(input: $input) {\n      ... on AuthPayload {\n        accessToken\n        refreshToken\n        session {\n          id\n          expiresAt\n        }\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n": typeof types.FinishLoginWith2FaDocument,
    "\n  mutation DeleteSession($input: DeleteSessionInput!) {\n    deleteSession(input: $input) {\n      ... on MutationSuccess {\n        success\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n": typeof types.DeleteSessionDocument,
    "\n  mutation RefreshAccessToken($input: RefreshAccessTokenInput!) {\n    refreshAccessToken(input: $input) {\n      ... on AuthPayload {\n        accessToken\n        refreshToken\n        session {\n          id\n        }\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n": typeof types.RefreshAccessTokenDocument,
};
const documents: Documents = {
    "\n  mutation VerifyOTP($input: VerifyOTPInput!) {\n    verifyOTP(input: $input) {\n      ... on TwoFactorSuccessPayload {\n        transactionToken\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n": types.VerifyOtpDocument,
    "\n  query GetCurrentUser {\n    getCurrentUser {\n      id\n      username\n      name\n      email\n      is2FAEnabled\n    }\n  }\n": types.GetCurrentUserDocument,
    "\n  mutation StartPasswordReset($input: StartPasswordResetInput!) {\n    startPasswordReset(input: $input) {\n      ... on MutationSuccess {\n        success\n      }\n\n      ... on TwoFactorRequiredPayload {\n        transactionID\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n": types.StartPasswordResetDocument,
    "\n  mutation LoginWithPassword($input: LoginWithPasswordInput!) {\n    loginWithPassword(input: $input) {\n      ... on AuthPayload {\n        accessToken\n        refreshToken\n        session {\n          id\n          expiresAt\n        }\n      }\n\n      ... on TwoFactorRequiredPayload {\n        transactionID\n        sessionID\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n": types.LoginWithPasswordDocument,
    "\n  mutation FinishEmailSignup($input: FinishEmailSignupInput!) {\n    finishEmailSignup(input: $input) {\n      ... on AuthPayload {\n        accessToken\n        refreshToken\n        session {\n          id\n          expiresAt\n        }\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n": types.FinishEmailSignupDocument,
    "\n  mutation StartEnable2FA($input: StartEnable2FAInput!) {\n    startEnable2FA(input: $input) {\n      ... on TwoFactorRequiredPayload {\n        transactionID\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n": types.StartEnable2FaDocument,
    "\n  mutation StartDisable2FA($input: StartDisable2FAInput!) {\n    startDisable2FA(input: $input) {\n      ... on TwoFactorRequiredPayload {\n        transactionID\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n": types.StartDisable2FaDocument,
    "\n  query GetEnable2FAVerification {\n    getEnable2FAVerification {\n      otpURI\n    }\n  }\n": types.GetEnable2FaVerificationDocument,
    "\n  mutation FinishEnable2FA($input: FinishEnable2FAInput!) {\n    finishEnable2FA(input: $input) {\n      ... on MutationSuccess {\n        success\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n": types.FinishEnable2FaDocument,
    "\n  mutation FinishPasswordReset($input: FinishPasswordResetInput!) {\n    finishPasswordReset(input: $input) {\n      ... on MutationSuccess {\n        success\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n": types.FinishPasswordResetDocument,
    "\n  mutation StartEmailSignup($input: StartEmailSignupInput!) {\n    startEmailSignup(input: $input) {\n      ... on TwoFactorRequiredPayload {\n        transactionID\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n": types.StartEmailSignupDocument,
    "\n  mutation FinishDisable2FA($input: FinishDisable2FAInput!) {\n    finishDisable2FA(input: $input) {\n      ... on MutationSuccess {\n        success\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n": types.FinishDisable2FaDocument,
    "\n  mutation FinishLoginWith2FA($input: FinishLoginWith2FAInput!) {\n    finishLoginWith2FA(input: $input) {\n      ... on AuthPayload {\n        accessToken\n        refreshToken\n        session {\n          id\n          expiresAt\n        }\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n": types.FinishLoginWith2FaDocument,
    "\n  mutation DeleteSession($input: DeleteSessionInput!) {\n    deleteSession(input: $input) {\n      ... on MutationSuccess {\n        success\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n": types.DeleteSessionDocument,
    "\n  mutation RefreshAccessToken($input: RefreshAccessTokenInput!) {\n    refreshAccessToken(input: $input) {\n      ... on AuthPayload {\n        accessToken\n        refreshToken\n        session {\n          id\n        }\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n": types.RefreshAccessTokenDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation VerifyOTP($input: VerifyOTPInput!) {\n    verifyOTP(input: $input) {\n      ... on TwoFactorSuccessPayload {\n        transactionToken\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation VerifyOTP($input: VerifyOTPInput!) {\n    verifyOTP(input: $input) {\n      ... on TwoFactorSuccessPayload {\n        transactionToken\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCurrentUser {\n    getCurrentUser {\n      id\n      username\n      name\n      email\n      is2FAEnabled\n    }\n  }\n"): (typeof documents)["\n  query GetCurrentUser {\n    getCurrentUser {\n      id\n      username\n      name\n      email\n      is2FAEnabled\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation StartPasswordReset($input: StartPasswordResetInput!) {\n    startPasswordReset(input: $input) {\n      ... on MutationSuccess {\n        success\n      }\n\n      ... on TwoFactorRequiredPayload {\n        transactionID\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation StartPasswordReset($input: StartPasswordResetInput!) {\n    startPasswordReset(input: $input) {\n      ... on MutationSuccess {\n        success\n      }\n\n      ... on TwoFactorRequiredPayload {\n        transactionID\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LoginWithPassword($input: LoginWithPasswordInput!) {\n    loginWithPassword(input: $input) {\n      ... on AuthPayload {\n        accessToken\n        refreshToken\n        session {\n          id\n          expiresAt\n        }\n      }\n\n      ... on TwoFactorRequiredPayload {\n        transactionID\n        sessionID\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation LoginWithPassword($input: LoginWithPasswordInput!) {\n    loginWithPassword(input: $input) {\n      ... on AuthPayload {\n        accessToken\n        refreshToken\n        session {\n          id\n          expiresAt\n        }\n      }\n\n      ... on TwoFactorRequiredPayload {\n        transactionID\n        sessionID\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation FinishEmailSignup($input: FinishEmailSignupInput!) {\n    finishEmailSignup(input: $input) {\n      ... on AuthPayload {\n        accessToken\n        refreshToken\n        session {\n          id\n          expiresAt\n        }\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation FinishEmailSignup($input: FinishEmailSignupInput!) {\n    finishEmailSignup(input: $input) {\n      ... on AuthPayload {\n        accessToken\n        refreshToken\n        session {\n          id\n          expiresAt\n        }\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation StartEnable2FA($input: StartEnable2FAInput!) {\n    startEnable2FA(input: $input) {\n      ... on TwoFactorRequiredPayload {\n        transactionID\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation StartEnable2FA($input: StartEnable2FAInput!) {\n    startEnable2FA(input: $input) {\n      ... on TwoFactorRequiredPayload {\n        transactionID\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation StartDisable2FA($input: StartDisable2FAInput!) {\n    startDisable2FA(input: $input) {\n      ... on TwoFactorRequiredPayload {\n        transactionID\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation StartDisable2FA($input: StartDisable2FAInput!) {\n    startDisable2FA(input: $input) {\n      ... on TwoFactorRequiredPayload {\n        transactionID\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetEnable2FAVerification {\n    getEnable2FAVerification {\n      otpURI\n    }\n  }\n"): (typeof documents)["\n  query GetEnable2FAVerification {\n    getEnable2FAVerification {\n      otpURI\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation FinishEnable2FA($input: FinishEnable2FAInput!) {\n    finishEnable2FA(input: $input) {\n      ... on MutationSuccess {\n        success\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation FinishEnable2FA($input: FinishEnable2FAInput!) {\n    finishEnable2FA(input: $input) {\n      ... on MutationSuccess {\n        success\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation FinishPasswordReset($input: FinishPasswordResetInput!) {\n    finishPasswordReset(input: $input) {\n      ... on MutationSuccess {\n        success\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation FinishPasswordReset($input: FinishPasswordResetInput!) {\n    finishPasswordReset(input: $input) {\n      ... on MutationSuccess {\n        success\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation StartEmailSignup($input: StartEmailSignupInput!) {\n    startEmailSignup(input: $input) {\n      ... on TwoFactorRequiredPayload {\n        transactionID\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation StartEmailSignup($input: StartEmailSignupInput!) {\n    startEmailSignup(input: $input) {\n      ... on TwoFactorRequiredPayload {\n        transactionID\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation FinishDisable2FA($input: FinishDisable2FAInput!) {\n    finishDisable2FA(input: $input) {\n      ... on MutationSuccess {\n        success\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation FinishDisable2FA($input: FinishDisable2FAInput!) {\n    finishDisable2FA(input: $input) {\n      ... on MutationSuccess {\n        success\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation FinishLoginWith2FA($input: FinishLoginWith2FAInput!) {\n    finishLoginWith2FA(input: $input) {\n      ... on AuthPayload {\n        accessToken\n        refreshToken\n        session {\n          id\n          expiresAt\n        }\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation FinishLoginWith2FA($input: FinishLoginWith2FAInput!) {\n    finishLoginWith2FA(input: $input) {\n      ... on AuthPayload {\n        accessToken\n        refreshToken\n        session {\n          id\n          expiresAt\n        }\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteSession($input: DeleteSessionInput!) {\n    deleteSession(input: $input) {\n      ... on MutationSuccess {\n        success\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteSession($input: DeleteSessionInput!) {\n    deleteSession(input: $input) {\n      ... on MutationSuccess {\n        success\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RefreshAccessToken($input: RefreshAccessTokenInput!) {\n    refreshAccessToken(input: $input) {\n      ... on AuthPayload {\n        accessToken\n        refreshToken\n        session {\n          id\n        }\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RefreshAccessToken($input: RefreshAccessTokenInput!) {\n    refreshAccessToken(input: $input) {\n      ... on AuthPayload {\n        accessToken\n        refreshToken\n        session {\n          id\n        }\n      }\n\n      ... on MutationErrorPayload {\n        error {\n          title\n          message\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;