import dayjs from "dayjs";
import { useMemo } from "react";
import { Alert, Divider, Stack, Box, Typography } from "@mui/material";
import type { Venue, VenueBooking } from "../../types/venue";
import Loader from "../Loader";
import { FONTS } from "../../theme";

export type ManagerVenueBookingRow = {
  venue: Venue;
  booking: VenueBooking;
};

type Props = {
  rows: ManagerVenueBookingRow[];
  loading: boolean;
  error: string | null;
  title?: string;
};

export default function ManagerVenueBookings({
  rows,
  loading,
  error,
  title = "Bookings on Your Venues",
}: Props) {
  const visibleRows = useMemo(() => {
    return rows
      .filter(({ booking }) => dayjs(booking.dateTo).isAfter(dayjs()))
      .sort(
        (a, b) =>
          dayjs(a.booking.dateFrom).valueOf() -
          dayjs(b.booking.dateFrom).valueOf(),
      );
  }, [rows]);
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 1, fontSize: 22 }}>
        {title}
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {loading ? (
        <Loader message="Loading bookings…" />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : visibleRows.length === 0 ? (
        <Alert severity="info">No upcoming bookings on your venues.</Alert>
      ) : (
        <Stack spacing={1.5}>
          {visibleRows.map(({ venue, booking }) => (
            <BookingRow key={booking.id} venue={venue} booking={booking} />
          ))}
        </Stack>
      )}
    </Box>
  );
}

function BookingRow({
  venue,
  booking,
}: {
  venue: Venue;
  booking: VenueBooking;
}) {
  const img = venue.media?.[0]?.url ?? "";
  const alt = venue.media?.[0]?.alt ?? venue.name;

  const from = dayjs(booking.dateFrom);
  const to = dayjs(booking.dateTo);
  const nights = Math.max(
    0,
    to.startOf("day").diff(from.startOf("day"), "day"),
  );
  const total = (venue.price ?? 0) * nights;
  const guestName =
    booking.customer?.name ?? booking.customer?.email ?? "Guest";

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "64px 1fr", sm: "80px 1fr 200px" },
        alignItems: "center",
        gap: 2,
        p: 1.5,
        border: "1px solid #e0e0e0",
        borderRadius: 1.5,
      }}
    >
      <Box
        component="img"
        src={img}
        alt={alt}
        sx={{
          width: { xs: 64, sm: 80 },
          height: { xs: 64, sm: 80 },
          objectFit: "cover",
          borderRadius: 1,
        }}
      />
      <Box>
        <Typography sx={{ fontSize: 18 }}>{venue.name}</Typography>
        <Typography fontFamily={FONTS.sans}>
          {from.format("DD/MM/YY")} – {to.format("DD/MM/YY")} • Guests:{" "}
          {booking.guests}
        </Typography>
        <Typography fontFamily={FONTS.sans}>Customer: {guestName}</Typography>
      </Box>

      <Box sx={{ justifySelf: { sm: "end" } }}>
        <Typography fontFamily={FONTS.sans} sx={{ fontWeight: 600 }}>
          Total: {total} kr
        </Typography>
      </Box>
    </Box>
  );
}
