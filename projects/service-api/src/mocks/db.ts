import { factory, nullable, primaryKey } from '@mswjs/data';

export const db = factory({
  user: {
    id: primaryKey(() => 'test_id'),
    auth0ID: () => 'auth0|test_id',
    email: () => 'user@test.com',
    emailVerified: () => true,
    name: () => 'Test User',
    firstName: () => 'John',
    createdAt: () => new Date(),
  },
  world: {
    id: primaryKey(() => 'test_id'),
    ownerID: () => 'test_id',
    name: () => 'New World',
    fantasyType: () => 'Medium',
    technologyLevel: () => 'Medieval',
    archetype: nullable<string>(() => null),
    atmosphere: () => 'Neutral',
    population: () => 'Average',
    geographyType: () => 'Supercontinent',
    geographyFeatures: () => [
      'Deserts',
      'Forest',
      'Mountains',
      'Plains',
      'Swamps',
      'Tundra',
    ],
    createdAt: () => new Date(),
    updatedAt: () => new Date(),
  },
});
