import dayjs, { Dayjs } from "dayjs";
import { Stack } from "@mui/material";
import LabeledDatePicker from "./LabeledDatePicker";
import type { VenueBooking } from "../../types/venue";

/**
 * Is a date inside any existing booking?
 * Treats bookings like (from, to) at day-level.
 */
function isDateInsideAnyBooking(date: Dayjs, bookings: VenueBooking[]) {
  return bookings.some((b) => {
    const from = dayjs(b.dateFrom).startOf("day");
    const to = dayjs(b.dateTo).startOf("day");
    return (
      date.isSame(from, "day") ||
      (date.isAfter(from, "day") && date.isBefore(to, "day"))
    );
  });
}

/**
 * Do the chosen dates overlap with any booking?
 */
function rangeOverlapsBookings(
  start: Dayjs,
  end: Dayjs,
  bookings: VenueBooking[],
) {
  if (!start || !end) return false;
  return bookings.some((b) => {
    const bStart = dayjs(b.dateFrom).startOf("day");
    const bEnd = dayjs(b.dateTo).startOf("day");
    return start.isBefore(bEnd, "day") && end.isAfter(bStart, "day");
  });
}

type Props = {
  /** Existing bookings for this venue. */
  bookings?: VenueBooking[];
  /** Selected check-in date. */
  checkIn: Dayjs | null;
  /** Selected check-out date. */
  checkOut: Dayjs | null;
  /** Called whenever either date changes. */
  onChange: (next: { checkIn: Dayjs | null; checkOut: Dayjs | null }) => void;
};

/**
 * Two date pickers (check-in / check-out) with booking rules.
 */
export default function AvailabilityPicker({
  bookings = [],
  checkIn,
  checkOut,
  onChange,
}: Props) {
  const today = dayjs().startOf("day");

  const disableBooked = (d: Dayjs) =>
    d.isBefore(today, "day") || isDateInsideAnyBooking(d, bookings);

  return (
    <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
      <LabeledDatePicker
        label="Check-in"
        value={checkIn}
        onChange={(v) => onChange({ checkIn: v, checkOut })}
        minDate={today}
        placeholder="DD/MM/YY"
        shouldDisableDate={(d) =>
          disableBooked(d) ||
          (!!checkOut &&
            (d.isSame(checkOut, "day") ||
              d.isAfter(checkOut, "day") ||
              rangeOverlapsBookings(d, checkOut, bookings)))
        }
        slotProps={{
          textField: { size: "small", sx: { width: { xs: "100%", sm: 150 } } },
        }}
      />
      <LabeledDatePicker
        label="Check-out"
        value={checkOut}
        onChange={(v) => onChange({ checkIn, checkOut: v })}
        placeholder="DD/MM/YY"
        shouldDisableDate={(d) =>
          disableBooked(d) ||
          (!!checkIn &&
            (d.isSame(checkIn, "day") ||
              d.isBefore(checkIn, "day") ||
              rangeOverlapsBookings(checkIn, d, bookings)))
        }
        slotProps={{
          textField: { size: "small", sx: { width: { xs: "100%", sm: 150 } } },
        }}
      />
    </Stack>
  );
}
