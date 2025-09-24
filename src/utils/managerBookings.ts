import dayjs from "dayjs";
import type { Venue } from "../types/venue";
import type { ManagerVenueBookingRow } from "../components/venue/ManagerVenueBookings";

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
