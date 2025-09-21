import type {
  CreateBookingInput,
  CreateBookingSuccess,
} from "../types/bookings";
import { BOOKINGS_URL, buildHeaders, PROFILE_BOOKINGS_URL } from "./endpoints";
import type { ApiErrorResponse } from "../types/auth";
import type { ProfileBookingsResponse } from "../types/bookings";

export async function createBooking(
  data: CreateBookingInput,
  token: string,
): Promise<CreateBookingSuccess> {
  const res = await fetch(BOOKINGS_URL, {
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
      `Booking failed (${res.status})`;
    throw new Error(msg);
  }
  return json as CreateBookingSuccess;
}

export async function getProfileBookings(
  username: string,
  token: string,
  opts?: { _venue?: boolean },
): Promise<ProfileBookingsResponse> {
  const url = new URL(PROFILE_BOOKINGS_URL(username));
  if (opts?._venue) url.searchParams.set("_venue", "true");

  const res = await fetch(url.toString(), {
    headers: buildHeaders(token),
  });

  const json: unknown = await res.json();

  if (!res.ok) {
    const err = json as ApiErrorResponse;
    const msg =
      err.errors?.[0]?.message ||
      err.message ||
      `Could not load bookings (${res.status})`;
    throw new Error(msg);
  }

  return json as ProfileBookingsResponse;
}
