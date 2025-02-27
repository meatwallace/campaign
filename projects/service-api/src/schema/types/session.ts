import invariant from 'tiny-invariant';
import { SessionData } from '~/services/session-service/types';
import { builder } from '../builder';
import { User } from './user';

export const Session = builder.objectRef<SessionData>('Session');

Session.implement({
  fields: (t) => ({
    id: t.exposeID('id'),
    expiresAt: t.expose('expiresAt', { type: 'DateTime' }),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    user: t.field({
      type: User,
      resolve: async (parent, args, ctx) => {
        const user = await ctx.services.user.getUser({
          id: parent.userID,
        });

        invariant(user, 'user must exist for session to be created');

        return user;
      },
    }),
  }),
});
