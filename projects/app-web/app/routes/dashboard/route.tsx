import { SyntheticEvent } from 'react';
import { Form, useFetcher } from 'react-router';
import type { ArrayValues } from 'type-fest';
import type { GetWorldsQuery as GetWorldsQueryResponse } from '~/gql/graphql.ts';
import { Button } from '~/components/button.tsx';
import { Header } from '~/components/header.tsx';
import { GetCurrentUser } from '~/data/queries/get-current-user';
import { graphql } from '~/gql';
import { Routes } from '~/types.ts';
import { createGQLClient } from '~/utils/create-gql-client.server.ts';
import { getDistanceFromNow } from '~/utils/get-distance-from-now.ts';
import { requireAuth } from '~/utils/require-auth.server.ts';
import { Route } from './+types/route.ts';
import * as styles from './route.css.ts';

const GetWorldsQuery = graphql(/* GraphQL */ `
  query GetWorlds($input: GetWorldsInput!) {
    getWorlds(input: $input) {
      id
      name
      updatedAt
    }
  }
`);

export async function loader({ request }: Route.LoaderArgs) {
  const client = createGQLClient();

  await requireAuth(request, { client });

  const [{ getCurrentUser }, { getWorlds }] = await Promise.all([
    client.request(GetCurrentUser, {}),
    client.request(GetWorldsQuery, { input: {} }),
  ]);

  return { user: getCurrentUser, worlds: getWorlds };
}

export const meta: Route.MetaFunction = () => [
  {
    description: '',
    title: '',
  },
];

export function Dashboard({ loaderData }: Route.ComponentProps) {
  const { user, worlds } = loaderData;

  const createWorldFetcher = useFetcher();

  const isCreatingWorld = createWorldFetcher.state !== 'idle';

  return (
    <>
      <Header user={user} />
      <main className={styles.container}>
        <section className={styles.worldsContainer}>
          <h2 className={styles.worldsHeader}>Your Worlds</h2>
          {/* CASE: user has worlds */}
          {worlds.length > 0 && (
            <>
              <div className={styles.worldsList}>
                {worlds.map((world) => (
                  <WorldListItem key={world.id} {...world} />
                ))}
              </div>
              <Form action={Routes.CreateWorld} method="post">
                <Button className={styles.createWorldButton} size="small">
                  Create World
                </Button>
              </Form>
            </>
          )}
          {/* CASE: user has no worlds */}
          {worlds.length === 0 && (
            <div className={styles.noWorldsContainer}>
              <p className={styles.noWorldsText}>
                You haven&apos;t created a world yet.
              </p>
              <createWorldFetcher.Form
                action={Routes.CreateWorld}
                method="post"
              >
                <Button className={styles.noWorldCreateWorldButton}>
                  {isCreatingWorld ? 'Creating...' : 'Create world'}
                </Button>
              </createWorldFetcher.Form>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

type WorldListItemProps = ArrayValues<GetWorldsQueryResponse['getWorlds']> & {
  //
};

const handleDeleteWorld = (event: SyntheticEvent<HTMLFormElement>) => {
  const confirmed = confirm('Are you sure you want to delete this world?');

  if (!confirmed) {
    event.preventDefault();

    return;
  }
};

function WorldListItem(props: WorldListItemProps) {
  const deleteWorldFetcher = useFetcher();

  const isDeleting = deleteWorldFetcher.state !== 'idle';

  return (
    <div key={props.id} className={styles.worldsListItem}>
      <span className={styles.worldName}>{props.name}</span>
      <span className={styles.singleLine}>
        <span className={styles.updatedAtLabel}>Updated: </span>
        <span className={styles.updatedAt}>
          {getDistanceFromNow(new Date(props.updatedAt))}
        </span>
      </span>
      <span className={styles.worldID}>{props.id}</span>
      {/* TODO: popout menu */}
      <deleteWorldFetcher.Form
        action={Routes.DeleteWorld.replace(':worldID', props.id)}
        method="post"
        onSubmit={handleDeleteWorld}
      >
        <Button className={styles.deleteWorldButton} size="small">
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </deleteWorldFetcher.Form>
    </div>
  );
}

export default Dashboard;
