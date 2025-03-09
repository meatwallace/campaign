import { createAuthMiddleware } from '@chrono/service-utils';
import { createYoga } from 'graphql-yoga';
import { app } from './app';
import { createYogaContext } from './create-yoga-context';
import { env } from './env';
import { schema } from './schema';

const tokenVerifierConfig = {
  audience: env.API_IDENTIFIER,
  issuer: env.API_IDENTIFIER,
  signingKey: env.JWT_SIGNING_SECRET,
};

const authMiddleware = createAuthMiddleware({ tokenVerifierConfig });

export function initYoga() {
  app.on(['GET', 'POST'], '/graphql', authMiddleware, async (honoCtx) => {
    const yoga = createYoga({
      context: (yogaCtx) => createYogaContext(yogaCtx, honoCtx),
      graphiql: env.isDevelopment,
      graphqlEndpoint: '/graphql',
      logging: env.LOGGING,
      maskedErrors: env.isProduction,
      schema: schema,
    });

    return yoga.fetch(honoCtx.req.raw, honoCtx.env);
  });
}
