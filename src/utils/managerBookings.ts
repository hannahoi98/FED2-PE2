import dayjs from "dayjs";
import type { Venue } from "../types/venue";
import type { ManagerVenueBookingRow } from "../components/profile/manager/ManagerVenueBookings";

/**
 * Turn a manager's venues (with bookings) into flat rows for the UI.
 *
 * We only include bookings that are happening now or in the future:
 * - starts today
 * - starts after today
 * - or already started but hasn't ended yet (still ongoing today)
 *
 * Then we sort the rows by the booking start date (soonest first).
 *
 * @param venues - Venues owned by the manager, ideally with `bookings` included.
 * @returns Array of `{ venue, booking }` ready for the ManagerVenueBookings list.
 */
export function venuesToManagerRows(venues: Venue[]): ManagerVenueBookingRow[] {
  const today = dayjs().startOf("day");

  const rows: ManagerVenueBookingRow[] = [];
  for (const v of venues) {
    for (const b of v.bookings ?? []) {
      const from = dayjs(b.dateFrom).startOf("day");
      const to = dayjs(b.dateTo).startOf("day");
      if (from.isSame(today) || from.isAfter(today) || today.isBefore(to)) {
        rows.push({ venue: v, booking: b });
      }
    }
  }

  rows.sort(
    (a, b) =>
      dayjs(a.booking.dateFrom).valueOf() - dayjs(b.booking.dateFrom).valueOf(),
  );

  return rows;
}
