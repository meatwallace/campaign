import { graphql, HttpResponse } from 'msw';
import { AuthPayload } from '~/gql/graphql';
import { db } from '../../db';
import { encodeMockJWT } from '../../utils/encode-mock-jwt';
import { MutationResponse } from './types';

type RefreshAccessTokenResponse = MutationResponse<{
  refreshAccessToken: AuthPayload;
}>;

type RefreshAccessTokenVariables = {
  input: {
    refreshToken: string;
  };
};

const EXPIRATION_IN_S = 60 * 60 * 24; // 1 day

export const RefreshAccessToken = graphql.mutation<
  RefreshAccessTokenResponse,
  RefreshAccessTokenVariables
>('RefreshAccessToken', async ({ variables }) => {
  const session = db.session.findFirst({
    where: {
      refreshToken: {
        equals: variables.input.refreshToken,
      },
    },
  });

  if (!session) {
    return HttpResponse.json({
      data: {
        refreshAccessToken: {
          error: {
            title: 'Invalid refresh token',
            message: 'The refresh token is invalid',
          },
        },
      },
    });
  }

  const user = db.user.findFirst({
    where: {
      id: {
        equals: session.userID,
      },
    },
  });

  if (!user) {
    return HttpResponse.json({
      data: {
        refreshAccessToken: {
          error: {
            title: 'Invalid refresh token',
            message: 'The refresh token is invalid',
          },
        },
      },
    });
  }

  const accessToken = encodeMockJWT({
    sub: user.id,
    exp: Math.floor(Date.now() / 1000) + EXPIRATION_IN_S,
  });

  return HttpResponse.json({
    data: {
      refreshAccessToken: {
        refreshToken: session.refreshToken,
        accessToken,
        session: {
          ...session,
          user: user,
        },
      },
    },
  });
});
