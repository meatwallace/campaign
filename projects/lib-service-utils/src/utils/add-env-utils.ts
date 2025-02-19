type Env = {
  NODE_ENV: 'development' | 'test' | 'production' | 'e2e';
};

/**
 *
 * A reusable Zod transformer that adds environment utility properties to any
 * environment schema that includes a NODE_ENV field.
 *
 * @example
 * ```ts
 * const envSchema = z
 *   .object({
 *     NODE_ENV: z.enum(['development', 'test', 'production', 'e2e']),
 *     // ... other env vars
 *   })
 *   .transform(addEnvUtils);
 * ```
 */
export const addEnvUtils = <T extends Env>(env: T) => ({
  ...env,
  isProduction: env.NODE_ENV === 'production',
  isDevelopment: env.NODE_ENV === 'development',
  isTest: env.NODE_ENV === 'test',
  isE2E: env.NODE_ENV === 'e2e',
});
