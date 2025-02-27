import userEvent from '@testing-library/user-event';
import { afterEach, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import { Form } from 'react-router';
import { drop } from '@mswjs/data';
import { withAuthedUser } from '~/test-utils/with-authed-user.ts';
import { createGQLClient } from '~/utils/create-gql-client.server.ts';
import { db } from '~/mocks/db';
import { Routes } from '~/types';
import { action } from './create';

type TestConfig = {
  isAuthed: boolean;
};

const client = createGQLClient();

function setupTest(config: TestConfig) {
  const CreateWorldStub = createRoutesStub([
    {
      path: '/',
      Component: () => (
        <Form action={Routes.CreateWorld} method="post">
          <button type="submit">Create</button>
        </Form>
      ),
    },
    {
      path: Routes.CreateWorld,
      Component: null,
      // @ts-expect-error(#35) - react router test types are out of date
      action: config.isAuthed
        ? // @ts-expect-error(#35) - react router test types are out of date
          withAuthedUser(action, { client, user: { id: 'user_id' } })
        : action,
    },
    { path: Routes.CreateWorldWizard, Component: () => 'Create World Wizard' },
    { path: Routes.Login, Component: () => 'LOGIN_ROUTE' },
  ]);

  render(<CreateWorldStub />);

  return { user: userEvent.setup() };
}

afterEach(() => {
  drop(db);

  client.setHeader('authorization', '');
});

test('it creates a world and redirects to the world creation wizard', async () => {
  const { user } = setupTest({ isAuthed: true });

  const createButton = await screen.findByText('Create');

  await user.click(createButton);

  const createWorldWizard = await screen.findByText('Create World Wizard');

  expect(createWorldWizard).toBeInTheDocument();

  const world = db.world.findFirst({
    where: {
      ownerID: {
        equals: 'user_id',
      },
    },
  });

  expect(world).not.toBeNull();
});

test('it redirects to the login route when not authenticated', async () => {
  const { user } = setupTest({ isAuthed: false });

  const createButton = await screen.findByText('Create');

  await user.click(createButton);

  expect(await screen.findByText('LOGIN_ROUTE')).toBeInTheDocument();
});
