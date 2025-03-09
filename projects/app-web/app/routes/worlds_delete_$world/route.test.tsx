import { afterEach, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRoutesStub, Form } from 'react-router';
import { drop } from '@mswjs/data';
import { db } from '~/mocks/db';
import { withAuthedUser } from '~/test-utils/with-authed-user.ts';
import { Routes } from '~/types';
import { action } from './route';

const userID = 'user_id';

interface TestConfig {
  isAuthed: boolean;
}

function setupTest(config: TestConfig) {
  const world = db.world.create({
    ownerID: userID,
  });

  const DeleteWorldStub = createRoutesStub([
    {
      Component: () => (
        <Form
          action={Routes.DeleteWorld.replace(':worldID', world.id)}
          method="post"
        >
          <button type="submit">Delete</button>
        </Form>
      ),
      path: '/',
    },
    {
      // @ts-expect-error(#35) - react router test types are out of date
      action: config.isAuthed
        ? // @ts-expect-error(#35) - react router test types are out of date
          withAuthedUser(action, { user: { id: userID } })
        : action,
      Component: () => 'DELETE_WORLD_ROUTE',
      path: Routes.DeleteWorld,
    },
    {
      Component: () => 'LOGIN_ROUTE',
      path: Routes.Login,
    },
  ]);

  render(<DeleteWorldStub />);

  return { user: userEvent.setup(), worldID: world.id };
}

afterEach(() => {
  drop(db);
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
