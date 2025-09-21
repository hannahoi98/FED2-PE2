import { PROFILE_URL, withQuery, buildHeaders } from "./endpoints";
import type { ApiErrorResponse, UpdateProfileInput } from "../types/auth";

export type ProfileResponse = {
  data: {
    name: string;
    email: string;
    avatar?: { url?: string; alt?: string } | null;
    venueManager: boolean;
    venues?: unknown[];
    bookings?: unknown[];
  };
  meta: Record<string, unknown>;
};

export async function getProfile(
  username: string,
  token: string,
  opts?: { _venues?: boolean; _bookings?: boolean },
): Promise<ProfileResponse> {
  const url = withQuery(PROFILE_URL(username), {
    _venues: opts?._venues,
    _bookings: opts?._bookings,
  });

  const res = await fetch(url, {
    headers: buildHeaders(token),
  });
  const json: unknown = await res.json();

  if (!res.ok) {
    const err = json as ApiErrorResponse;
    const msg =
      err.message ||
      err.errors?.[0]?.message ||
      `There was an issue fetching your profile. Please try again later (${res.status}).`;
    throw new Error(msg);
  }
  return json as ProfileResponse;
}

export async function UpdateProfileInput(
  username: string,
  token: string,
  data: UpdateProfileInput,
): Promise<ProfileResponse> {
  const res = await fetch(PROFILE_URL(username), {
    method: "PUT",
    headers: buildHeaders(token),
    body: JSON.stringify(data),
  });

  const json = (await res.json()) as ProfileResponse | ApiErrorResponse;

  if (!res.ok) {
    const err = json as ApiErrorResponse;
    const msg =
      err.message ||
      err.errors?.[0]?.message ||
      `There was an issue updating your avatar. Please try again later (${res.status}).`;
    throw new Error(msg);
  }
  return json as ProfileResponse;
}
