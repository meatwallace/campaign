import { expect, test, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { createId } from '@paralleldrive/cuid2';
import { ServiceID } from '@chrono/service-types';
import { env } from '~/env';
import { server } from '~/mocks/node';
import { createServiceContext } from '../utils/create-service-context.ts';
import { generateWorldNames } from './generate-world-names.ts';

const ENDPOINT_URL = `${env.WORLDS_SERVICE_URL}generate-world-names`;

afterEach(() => {
  server.resetHandlers();
});

test('it returns generated world names on successful response', async () => {
  const ctx = createServiceContext({
    requestID: createId(),
    serviceID: ServiceID.ServiceWorld,
    apiURL: env.WORLDS_SERVICE_URL,
  });

  const request = {
    ownerID: 'user-123',
    worldID: 'world-123',
  };

  const result = await generateWorldNames(request, ctx);

  expect(result).toBeArrayOfSize(5);
  expect(result).toSatisfyAll((name: string) => typeof name === 'string');
});

test('it throws an error when the request fails', async () => {
  server.use(
    http.post(ENDPOINT_URL, () => {
      return HttpResponse.error();
    }),
  );

  const ctx = createServiceContext({
    requestID: createId(),
    serviceID: ServiceID.ServiceWorld,
    apiURL: env.WORLDS_SERVICE_URL,
  });

  const request = {
    ownerID: 'user-123',
    worldID: 'world-123',
  };

  await expect(generateWorldNames(request, ctx)).rejects.toThrow();
});
