import type { CreateVenueInput } from "../types/venue-input";
import type { ApiErrorResponse } from "../types/auth";
import { ALL_VENUES_URL, buildHeaders } from "./endpoints";

type VenueResponse<Data = unknown> = { data: Data };

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
