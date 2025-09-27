/** Base URL for the API */
export const BASE_API_URL = "https://v2.api.noroff.dev";

/** Venues and search endpoints */
export const ALL_VENUES_URL = `${BASE_API_URL}/holidaze/venues`;
export const SEARCH_VENUES_URL = `${BASE_API_URL}/holidaze/venues/search`;

/** Build a single venue URL by id. */
export const SINGLE_VENUE_URL = (id: string) =>
  `${BASE_API_URL}/holidaze/venues/${id}`;

/** Single venue with bookings included */
export const SINGLE_VENUE_WITH_BOOKINGS_URL = (id: string) =>
  `${SINGLE_VENUE_URL(id)}?_bookings=true`;

/** Auth endpoints. */
export const REGISTER_URL = `${BASE_API_URL}/auth/register`;
export const LOGIN_URL = `${BASE_API_URL}/auth/login`;

/** Bookings endpoint */
export const BOOKINGS_URL = `${BASE_API_URL}/holidaze/bookings`;

/** Some endpoints accept `_holidaze` to scope login; this helper builds that URL. */
export const LOGIN_URL_WITH_HOLIDAZE = (holidaze = true) =>
  `${LOGIN_URL}?_holidaze=${String(holidaze)}`;

/** API Key header */
export const API_KEY = "d5309f47-302a-47b5-9c4f-a00bba60239f";

/**
 * Helper to build the common headers.
 * - Always sends JSON content type
 * - Adds the Noroff API key
 * - Adds `Authorization: Bearer <token>` when provided
 */
export function buildHeaders(token?: string): HeadersInit {
  const h: Record<string, string> = { "Content-Type": "application/json" };
  h["X-Noroff-API-Key"] = API_KEY;
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
}

/** Profile base URL and sub-resources. */
export const PROFILE_URL = (name: string) =>
  `${BASE_API_URL}/holidaze/profiles/${encodeURIComponent(name)}`;

export const PROFILE_BOOKINGS_URL = (name: string) =>
  `${BASE_API_URL}/holidaze/profiles/${name}/bookings`;

export const PROFILE_VENUES_URL = (name: string) =>
  `${BASE_API_URL}/holidaze/profiles/${encodeURIComponent(name)}/venues`;

/** Append given `params` as a query string. Skips `undefined` values. */
export function withQuery(
  url: string,
  params: Record<string, string | number | boolean | undefined>,
) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined) q.set(k, String(v));
  });
  const qs = q.toString();
  return qs ? `${url}?${qs}` : url;
}
