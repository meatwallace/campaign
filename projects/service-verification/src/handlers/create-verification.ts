import { generateTOTP } from '@epic-web/totp';
import { createId } from '@paralleldrive/cuid2';
import * as schema from '@vers/postgres-schema';
import {
  CreateVerificationRequest,
  CreateVerificationResponse,
  VerificationType,
} from '@vers/service-types';
import { and, eq } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { Context } from 'hono';
import { Jsonify } from 'type-fest';

// alphanumeirc excluding 0, O, and I on purpose to avoid confusing users
const TOTP_CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789';

// standard charset used by 2FA apps
const TWO_FACTOR_CHARSET = '0123456789';

const VERIFICATION_TYPE_TO_CHARSET: Record<VerificationType, string> = {
  '2fa': TWO_FACTOR_CHARSET,
  '2fa-setup': TWO_FACTOR_CHARSET,
  'change-email': TOTP_CHARSET,
  onboarding: TOTP_CHARSET,
};

export async function createVerification(
  ctx: Context,
  db: PostgresJsDatabase<typeof schema>,
) {
  try {
    const { expiresAt, period, target, type } =
      await ctx.req.json<Jsonify<CreateVerificationRequest>>();

    // delete any existing verifications for this target and type to invalidate previous codes
    await db
      .delete(schema.verifications)
      .where(
        and(
          eq(schema.verifications.target, target),
          eq(schema.verifications.type, type),
        ),
      );

    const { otp, ...verificationConfig } = await generateTOTP({
      algorithm: 'SHA-256',
      charSet: VERIFICATION_TYPE_TO_CHARSET[type],
      period,
    });

    const verification: typeof schema.verifications.$inferSelect = {
      createdAt: new Date(),
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      id: createId(),
      target,
      type,
      ...verificationConfig,
    };

    await db.insert(schema.verifications).values(verification);

    const response: CreateVerificationResponse = {
      data: {
        id: verification.id,
        otp,
        target: verification.target,
        type: verification.type,
      },
      success: true,
    };

    return ctx.json(response);
  } catch (error: unknown) {
    // TODO(#16): capture via Sentry
    if (error instanceof Error) {
      const response = {
        error: 'An unknown error occurred',
        success: false,
      };

      return ctx.json(response);
    }

    throw error;
  }
}
