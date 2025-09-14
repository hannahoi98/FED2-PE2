import type { VenueBooking } from "../types/venue";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Stack } from "@mui/material";

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

type Props = {
  bookings: VenueBooking[] | undefined;
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
    <Stack>
      <DatePicker
        label="Check-in"
        value={checkIn}
        onChange={(v) => onChange({ checkIn: v, checkOut })}
        shouldDisableDate={disableBooked}
        minDate={today}
        slotProps={{
          textField: { fullWidth: true },
        }}
      />
      <DatePicker
        label="Check-out"
        value={checkOut}
        onChange={(v) => onChange({ checkIn, checkOut: v })}
        shouldDisableDate={(d) =>
          disableBooked(d) ||
          (checkIn
            ? d.isSame(checkIn, "day") || d.isBefore(checkIn, "day")
            : false)
        }
        minDate={checkIn ?? today}
        slotProps={{
          textField: { fullWidth: true },
        }}
      />
    </Stack>
  );
}
