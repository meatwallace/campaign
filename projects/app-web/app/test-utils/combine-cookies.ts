/**
 * Combines a Set-Cookie header from session storage with an existing
 * Cookie header for the sake of ensuring it's in the correct format
 * to be used as a final request Cookie header.
 *
 * Header#append does NOT append the Cookie header in the correct format.
 *
 * @param setCookieHeader - The Set-Cookie header to be added to the request.
 * @param existingCookieHeader - The existing Cookie header from the request.
 * @returns The combined cookie header.
 */
export function combineCookies(
  setCookieHeader: string,
  existingCookieHeader: string | null,
) {
  return existingCookieHeader
    ? `${existingCookieHeader}; ${setCookieHeader.split(';')[0]}`
    : setCookieHeader;
}
