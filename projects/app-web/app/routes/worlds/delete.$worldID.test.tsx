import userEvent from '@testing-library/user-event';
import { afterEach, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import { Form } from 'react-router';
import { drop } from '@mswjs/data';
import { db } from '~/mocks/db';
import { withAuthedUser } from '~/test-utils/with-authed-user.ts';
import { createGQLClient } from '~/utils/create-gql-client.server.ts';
import { Routes } from '~/types';
import { action } from './delete.$worldID';

const userID = 'user_id';

type TestConfig = {
  isAuthed: boolean;
};

const client = createGQLClient();

function setupTest(config: TestConfig) {
  const world = db.world.create({
    ownerID: userID,
  });

  const DeleteWorldStub = createRoutesStub([
    {
      path: '/',
      Component: () => (
        <Form
          action={Routes.DeleteWorld.replace(':worldID', world.id)}
          method="post"
        >
          <button type="submit">Delete</button>
        </Form>
      ),
    },
    {
      path: Routes.DeleteWorld,
      Component: () => 'DELETE_WORLD_ROUTE',
      // @ts-expect-error(#35) - react router test types are out of date
      action: config.isAuthed
        ? // @ts-expect-error(#35) - react router test types are out of date
          withAuthedUser(action, { client, user: { id: userID } })
        : action,
    },
    {
      path: Routes.Login,
      Component: () => 'LOGIN_ROUTE',
    },
  ]);

  render(<DeleteWorldStub />);

  return { user: userEvent.setup(), worldID: world.id };
}

afterEach(() => {
  drop(db);

  client.setHeader('authorization', '');
});

test('it deletes the expected world', async () => {
  const { user, worldID } = setupTest({ isAuthed: true });

  const deleteButton = await screen.findByText('Delete');

  await user.click(deleteButton);
  await screen.findByText('DELETE_WORLD_ROUTE');

  const world = db.world.findFirst({
    where: {
      id: {
        equals: worldID,
      },
    },
  });

  expect(world).toBeNull();
});

test('it redirects to the login route when not authenticated', async () => {
  const { user } = setupTest({ isAuthed: false });

  const deleteButton = await screen.findByText('Delete');

  await user.click(deleteButton);

  expect(await screen.findByText('LOGIN_ROUTE')).toBeInTheDocument();
});
