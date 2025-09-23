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
