import type { VenueBooking } from "../types/venue";
import dayjs, { Dayjs } from "dayjs";
import { Stack } from "@mui/material";
import LabeledDatePicker from "./ui/LabeledDatePicker";

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
  bookings?: VenueBooking[];
  checkIn: Dayjs | null;
  checkOut: Dayjs | null;
  onChange: (next: { checkIn: Dayjs | null; checkOut: Dayjs | null }) => void;
};

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
