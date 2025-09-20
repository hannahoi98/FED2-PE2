export const BASE_API_URL = "https://v2.api.noroff.dev";

export const ALL_VENUES_URL = `${BASE_API_URL}/holidaze/venues`;
export const SEARCH_VENUES_URL = `${BASE_API_URL}/holidaze/venues/search`;

export const SINGLE_VENUE_URL = (id: string) =>
  `${BASE_API_URL}/holidaze/venues/${id}`;

export const SINGLE_VENUE_WITH_BOOKINGS_URL = (id: string) =>
  `${SINGLE_VENUE_URL(id)}?_bookings=true`;

export const REGISTER_URL = `${BASE_API_URL}/auth/register`;

export const LOGIN_URL = `${BASE_API_URL}/auth/login`;

export const BOOKINGS_URL = `${BASE_API_URL}/holidaze/bookings`;

export const LOGIN_URL_WITH_HOLIDAZE = (holidaze = true) =>
  `${LOGIN_URL}?_holidaze=${String(holidaze)}`;

export const API_KEY = "d5309f47-302a-47b5-9c4f-a00bba60239f";

// Helper for right headers in all requests
export function buildHeaders(token?: string): HeadersInit {
  const h: Record<string, string> = { "Content-Type": "application/json" };
  h["X-Noroff-API-Key"] = API_KEY;
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
}

export const PROFILE_URL = (name: string) =>
  `${BASE_API_URL}/holidaze/profiles/${encodeURIComponent(name)}`;

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
