import type { Context, MiddlewareHandler, Next } from 'hono';
import type { Logger } from 'pino';
import { getPath } from 'hono/utils/url';

interface ContextVariables {
  requestId: string;
}

export function createLoggerMiddleware(logger: Logger): MiddlewareHandler {
  return async function loggerMiddleware(
    ctx: Context<{ Variables: ContextVariables }>,
    next: Next,
  ) {
    const path = getPath(ctx.req.raw);
    const requestID = ctx.get('requestId');
    const shortRequestID = requestID.slice(0, 8);

    logger.info(
      { requestID },
      `(${shortRequestID}) >>> ${ctx.req.method} ${path}`,
    );

    await next();

    logger.info(
      {
        requestID,
        response: {
          ok: String(ctx.res.ok),
          status: ctx.res.status,
        },
      },
      `(${shortRequestID}) <<< ${ctx.res.status} ${path}`,
    );
  };
}
