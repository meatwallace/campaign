import invariant from 'tiny-invariant';
import { Context, StandardMutationPayload } from '~/types';
import { builder } from '../builder';
import { MutationErrorPayload } from '../types/mutation-error-payload';
import { World } from '../types/world';
import { createPayloadResolver } from '../utils/create-payload-resolver';
import { requireAuth } from '../utils/require-auth';

type Args = {
  input: typeof CreateWorldInput.$inferInput;
};

export async function createWorld(
  _: object,
  args: Args,
  ctx: Context,
): Promise<StandardMutationPayload<typeof World.$inferType>> {
  invariant(ctx.user, 'user is required in an authed resolver');

  // eslint-disable-next-line no-useless-catch
  try {
    const world = await ctx.services.world.createWorld({
      ownerID: ctx.user.id,
    });

    return world;
  } catch (error: unknown) {
    // TODO(#16): capture via Sentry
    throw error;
  }
}

const CreateWorldInput = builder.inputType('CreateWorldInput', {
  fields: (t) => ({
    placeholder: t.string({ required: false }),
  }),
});

const CreateWorldPayload = builder.unionType('CreateWorldPayload', {
  types: [World, MutationErrorPayload],
  resolveType: createPayloadResolver(World),
});

export const resolve = requireAuth(createWorld);

builder.mutationField('createWorld', (t) =>
  t.field({
    type: CreateWorldPayload,
    args: {
      input: t.arg({ type: CreateWorldInput, required: true }),
    },
    resolve,
  }),
);
