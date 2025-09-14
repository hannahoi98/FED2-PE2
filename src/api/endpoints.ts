export const BASE_API_URL = "https://v2.api.noroff.dev";

export const ALL_VENUES_URL = `${BASE_API_URL}/holidaze/venues`;
export const SEARCH_VENUES_URL = `${BASE_API_URL}/holidaze/venues/search`;

export const SINGLE_VENUE_URL = (id: string) =>
  `${BASE_API_URL}/holidaze/venues/${id}`;

export const REGISTER_URL = `${BASE_API_URL}/auth/register`;

export const API_KEY = "d5309f47-302a-47b5-9c4f-a00bba60239f";

// Helper for right headers in all requests
export function buildHeaders(token?: string): HeadersInit {
  const h: Record<string, string> = { "Content-Type": "application/json" };
  h["X-Noroff-API-Key"] = API_KEY;
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
}
