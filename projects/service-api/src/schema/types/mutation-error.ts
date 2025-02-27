import { builder } from '../builder';

type MutationErrorData = {
  title: string;
  message: string;
};

export const MutationError =
  builder.objectRef<MutationErrorData>('MutationError');

MutationError.implement({
  fields: (t) => ({
    title: t.exposeString('title'),
    message: t.exposeString('message'),
  }),
});
