#!/usr/bin/env node

import { sql } from 'drizzle-orm';
import * as schema from '@chrono/postgres-schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { oraPromise } from 'ora';
import { pg } from './postgres/pg';

export const db = drizzle(pg, { schema });

async function reset() {
  const query = sql`
    -- Suppress NOTICE messages
    SET client_min_messages TO WARNING;

    -- Disable foreign key checks temporarily
    SET session_replication_role = 'replica';

    -- Drop all schemas except public (and system schemas)
    DO $$ DECLARE
        r RECORD;
    BEGIN
        FOR r IN (
            SELECT schema_name
            FROM information_schema.schemata
            WHERE schema_name NOT IN ('public', 'information_schema', 'pg_catalog', 'pg_toast')
        ) LOOP
            EXECUTE 'DROP SCHEMA IF EXISTS ' || quote_ident(r.schema_name) || ' CASCADE';
        END LOOP;
    END $$;

    -- Clean up public schema
    DO $$ DECLARE
        r RECORD;
    BEGIN
        -- Drop all tables
        FOR r IN (
            SELECT tablename 
            FROM pg_tables 
            WHERE schemaname = 'public'
        ) LOOP
            EXECUTE 'DROP TABLE IF EXISTS public.' || quote_ident(r.tablename) || ' CASCADE';
        END LOOP;

        -- Drop all views
        FOR r IN (
            SELECT viewname
            FROM pg_views
            WHERE schemaname = 'public'
        ) LOOP
            EXECUTE 'DROP VIEW IF EXISTS public.' || quote_ident(r.viewname) || ' CASCADE';
        END LOOP;

        -- Drop all types (including enums)
        FOR r IN (
            SELECT typname
            FROM pg_type t
            JOIN pg_namespace n ON t.typnamespace = n.oid
            WHERE n.nspname = 'public'
            AND t.typtype = 'e'
        ) LOOP
            EXECUTE 'DROP TYPE IF EXISTS public.' || quote_ident(r.typname) || ' CASCADE';
        END LOOP;

        -- Drop all functions
        FOR r IN (
            SELECT proname, oidvectortypes(proargtypes) as args
            FROM pg_proc
            INNER JOIN pg_namespace ns ON (pg_proc.pronamespace = ns.oid)
            WHERE ns.nspname = 'public'
        ) LOOP
            EXECUTE 'DROP FUNCTION IF EXISTS public.' || quote_ident(r.proname) || '(' || r.args || ') CASCADE';
        END LOOP;
    END $$;

    -- Re-enable foreign key checks
    SET session_replication_role = 'origin';
  `;

  const cleanupStart = Date.now();

  const cleanupSpinnerConfig = {
    text: 'Cleaning up database...',
    successText: () =>
      `Database cleanup completed in ${Date.now() - cleanupStart}ms`,
    failText: () => `Database cleanup failed in ${Date.now() - cleanupStart}ms`,
  };

  await oraPromise(db.execute(query), cleanupSpinnerConfig);

  const migrationStart = Date.now();

  const migrationSpinnerConfig = {
    text: 'Migrating database...',
    successText: () =>
      `Database migration completed in ${Date.now() - migrationStart}ms`,
    failText: () =>
      `Database migration failed in ${Date.now() - migrationStart}ms`,
  };

  await oraPromise(
    migrate(db, {
      migrationsFolder: '../../projects/db-postgres/migrations',
    }),
    migrationSpinnerConfig,
  );

  process.exit(0);
}

try {
  await reset();
} catch (error) {
  console.error('❌ Reset failed');
  console.error(error);

  process.exit(1);
}
