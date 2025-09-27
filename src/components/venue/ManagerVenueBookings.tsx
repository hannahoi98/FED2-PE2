import { useMemo } from "react";
import dayjs from "dayjs";
import { Alert, Divider, Stack, Box, Typography } from "@mui/material";
import Loader from "../Loader";
import { COLORS, FONTS } from "../../theme";
import type { Venue, VenueBooking } from "../../types/venue";

export type ManagerVenueBookingRow = {
  venue: Venue;
  booking: VenueBooking;
};

type Props = {
  /** Flattened list of (venue, booking) rows. */
  rows: ManagerVenueBookingRow[];
  loading: boolean;
  error: string | null;
  /** Optional title above the list. */
  title?: string;
};

/**
 * Manager view: upcoming bookings across all of your venues.
 */
export default function ManagerVenueBookings({
  rows,
  loading,
  error,
  title = "Bookings on Your Venues",
}: Props) {
  // Only show bookings that are still in the future; sort by start date
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
        gridTemplateColumns: { xs: "1fr", sm: "80px 1fr 200px" },
        alignItems: { xs: "stretch", sm: "center" },
        gap: { xs: 1, sm: 2 },
        border: `1px solid ${COLORS.mint}`,
        boxShadow: "0 2px 8px rgba(9,63,59,0.08)",
        overflow: "hidden",
        p: { xs: 0, sm: 1.5 },
        borderRadius: 2,
      }}
    >
      <Box
        component="img"
        src={img}
        alt={alt}
        sx={{
          display: "block",
          width: { xs: "100%", sm: 80 },
          height: { xs: 160, sm: "100%" },
          objectFit: "cover",
        }}
      />

      <Box sx={{ px: { xs: 1.5, sm: 0 }, py: { xs: 1.25, sm: 0 } }}>
        <Typography sx={{ fontSize: 18 }}>{venue.name}</Typography>
        <Typography fontFamily={FONTS.sans}>
          {from.format("DD/MM/YY")} – {to.format("DD/MM/YY")} • Guests:{" "}
          {booking.guests}
        </Typography>
        <Typography fontFamily={FONTS.sans}>Customer: {guestName}</Typography>
      </Box>

      <Box
        sx={{
          justifySelf: { sm: "end" },
          textAlign: { xs: "left", sm: "right" },
          px: { xs: 1.5, sm: 0 },
          py: { xs: 1.25, sm: 0 },
        }}
      >
        <Typography fontFamily={FONTS.sans} sx={{ fontWeight: 600 }}>
          Total: {total} kr
        </Typography>
      </Box>
    </Box>
  );
}
