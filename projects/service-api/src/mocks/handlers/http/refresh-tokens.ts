import { http, HttpResponse } from 'msw';
import { RefreshTokensRequest } from '@chrono/service-types';
import { env } from '~/env';
import { db } from '../../db';

const ENDPOINT_URL = `${env.SESSIONS_SERVICE_URL}refresh-tokens`;

export const refreshTokens = http.post<never, RefreshTokensRequest>(
  ENDPOINT_URL,
  async ({ request }) => {
    const body = await request.json();

    const session = db.session.findFirst({
      where: { refreshToken: { equals: body.refreshToken } },
    });

    if (!session) {
      return new HttpResponse(null, { status: 404 });
    }

    const { refreshToken: oldRefreshToken, ...sessionData } = session;

    const newRefreshToken = `refresh_token_${Date.now()}`;

    db.session.update({
      where: { id: { equals: session.id } },
      data: { refreshToken: newRefreshToken },
    });

    return HttpResponse.json({
      success: true,
      data: {
        accessToken: `access_token_${Date.now()}`,
        refreshToken: newRefreshToken,
        ...sessionData,
      },
    });
  },
);
