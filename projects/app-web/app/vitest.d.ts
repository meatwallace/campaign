import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

expect.extend(matchers);

// vitest instead `@vitest/expect`
declare module 'vitest' {
  interface JestAssertion<T>
    extends matchers.TestingLibraryMatchers<
      ReturnType<typeof expect.stringContaining>,
      T
    > {}
}