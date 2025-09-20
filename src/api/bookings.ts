import type {
  CreateBookingInput,
  CreateBookingSuccess,
} from "../types/bookings";
import { BOOKINGS_URL, buildHeaders } from "./endpoints";
import type { ApiErrorResponse } from "../types/auth";

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
