import type { UpdateVerificationPayload } from '@vers/service-types';
import { TRPCError } from '@trpc/server';
import * as schema from '@vers/postgres-schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import type { Context } from '../types';
import { t } from '../t';

export const UpdateVerificationInputSchema = z.object({
  id: z.string(),
  type: z.enum(['2fa', '2fa-setup', 'change-email', 'onboarding']).optional(),
});

export async function updateVerification(
  input: z.infer<typeof UpdateVerificationInputSchema>,
  ctx: Context,
): Promise<UpdateVerificationPayload> {
  try {
    const { id, ...update } = input;

    const [verification] = await ctx.db
      .update(schema.verifications)
      .set(update)
      .where(eq(schema.verifications.id, id))
      .returning({
        updatedID: schema.verifications.id,
      });

    return { updatedID: verification.updatedID };
  } catch (error: unknown) {
    // TODO(#16): capture via Sentry
    throw new TRPCError({
      cause: error,
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unknown error occurred',
    });
  }
}

export const procedure = t.procedure
  .input(UpdateVerificationInputSchema)
  .mutation(async ({ ctx, input }) => updateVerification(input, ctx));
