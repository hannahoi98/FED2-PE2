import type { CreateVenueInput, UpdateVenueInput } from "../types/venue-input";
import type { ApiErrorResponse } from "../types/auth";
import { ALL_VENUES_URL, SINGLE_VENUE_URL, buildHeaders } from "./endpoints";

/** Shape returned by venue endpoints: an object with a `data` field. */
type VenueResponse<Data = unknown> = { data: Data };

/**
 * Create a new venue.
 * @param data  Venue details to send in the request body.
 * @param token Logged-in venue manager's access token.
 * @returns     The server response object containing `data`.
 * @throws      Error with a helpful message if the request fails.
 */
export async function CreateVenue<T = unknown>(
  data: CreateVenueInput,
  token: string,
): Promise<VenueResponse<T>> {
  const res = await fetch(ALL_VENUES_URL, {
    method: "POST",
    headers: buildHeaders(token),
    body: JSON.stringify(data),
  });

  const json: unknown = await res.json();

  if (!res.ok) {
    const err = json as ApiErrorResponse;
    const msg =
      err.errors?.[0]?.message ||
      err.message ||
      `Create venue failed (${res.status})`;
    throw new Error(msg);
  }

  return json as VenueResponse<T>;
}

/**
 * Get one venue by ID.
 * @param id Venue ID.
 * @returns  The server response object containing `data`.
 * @throws   Error with a helpful message if the request fails.
 */
export async function getVenue<T = unknown>(
  id: string,
): Promise<VenueResponse<T>> {
  const url = new URL(SINGLE_VENUE_URL(id));
  const res = await fetch(url.toString());
  const json: unknown = await res.json();

  if (!res.ok) {
    const err = json as ApiErrorResponse;
    const msg =
      err.errors?.[0]?.message ||
      err.message ||
      `Failed to load venue (${res.status})`;
    throw new Error(msg);
  }
  return json as VenueResponse<T>;
}

/**
 * Update an existing venue.
 * @param id    Venue ID.
 * @param data  Updated venue details to send in the request body.
 * @param token Logged-in venue manager's access token.
 * @returns     The server response object containing `data`.
 * @throws      Error with a helpful message if the request fails.
 */
export async function updateVenue<T = unknown>(
  id: string,
  data: UpdateVenueInput,
  token: string,
): Promise<VenueResponse<T>> {
  const res = await fetch(SINGLE_VENUE_URL(id), {
    method: "PUT",
    headers: buildHeaders(token),
    body: JSON.stringify(data),
  });

  const json: unknown = await res.json();

  if (!res.ok) {
    const err = json as ApiErrorResponse;
    const msg =
      err.errors?.[0]?.message ||
      err.message ||
      `Create venue failed (${res.status})`;
    throw new Error(msg);
  }

  return json as VenueResponse<T>;
}

/**
 * Delete a venue.
 * @param id    Venue ID.
 * @param token Logged-in venue manager's access token.
 * @throws      Error with a helpful message if the request fails.
 */
export async function deleteVenue(id: string, token: string): Promise<void> {
  const res = await fetch(`${ALL_VENUES_URL}/${id}`, {
    method: "DELETE",
    headers: buildHeaders(token),
  });

  if (!res.ok) {
    const json = (await res.json()) as ApiErrorResponse | undefined;
    const msg =
      json?.errors?.[0]?.message ||
      json?.message ||
      `Delete failed (${res.status})`;
    throw new Error(msg);
  }
}
