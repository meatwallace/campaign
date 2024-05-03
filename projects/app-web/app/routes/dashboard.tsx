import { json, useLoaderData } from '@remix-run/react';
import { MetaFunction } from '@remix-run/node';
import { Header } from '../components/header';
import { graphql } from '../gql';
import { client } from '../client';

const GetCurrentUser = graphql(/* GraphQL */ `
  query GetCurrentUser {
    getCurrentUser {
      id
      name
    }
  }
`);

const GetWorlds = graphql(/* GraphQL */ `
  query GetWorlds($input: GetWorldsInput!) {
    getWorlds(input: $input) {
      id
      name
    }
  }
`);

export async function loader() {
  const [{ getCurrentUser }, { getWorlds }] = await Promise.all([
    client.request(GetCurrentUser),
    client.request(GetWorlds, { input: {} }),
  ]);

  return json({ user: getCurrentUser, worlds: getWorlds });
}

export const meta: MetaFunction = () => [
  {
    title: '',
    description: '',
  },
];

export function Dashboard() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, worlds } = useLoaderData<typeof loader>();

  return (
    <>
      <Header user={user} />
      <main>{/*  */}</main>
    </>
  );
}

export default Dashboard;
