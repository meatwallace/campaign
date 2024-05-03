import { http, HttpResponse } from 'msw';
import { env } from '../../../env';
import { db } from '../../db';

const ENDPOINT_URL = `${env.WORLDS_SERVICE_URL}create-world`;

export const createWorld = http.post(ENDPOINT_URL, async () => {
  const world = db.world.create({});

  return HttpResponse.json({ success: true, data: world });
});
