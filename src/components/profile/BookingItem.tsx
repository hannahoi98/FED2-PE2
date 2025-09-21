import dayjs from "dayjs";
import type { Booking } from "../../types/bookings";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
} from "@mui/material";
import { FONTS, COLORS } from "../../theme";
import { Link as RouterLink } from "react-router-dom";

type Props = { booking: Booking };

export default function BookingCard({ booking }: Props) {
  const v = booking.venue;
  if (!v) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6">Venue unavailable</Typography>
          <Typography sx={{ fontFamily: FONTS.sans }}>
            {dayjs(booking.dateFrom).format("DD/MM/YY")} –{" "}
            {dayjs(booking.dateTo).format("DD/MM/YY")}
            {" • "}Guests: {booking.guests}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const firstImage = v.media?.[0]?.url ?? " ";
  const firstAlt = v.media?.[0]?.alt ?? v.name;
  const place = [v.location?.city, v.location?.country]
    .filter(Boolean)
    .join(", ");

  const from = dayjs(booking.dateFrom);
  const to = dayjs(booking.dateTo);
  const nights = Math.max(
    0,
    to.startOf("day").diff(from.startOf("day"), "day"),
  );
  const total = (v?.price ?? 0) * nights;

  return (
    <Card
      sx={{
        border: `1px solid ${COLORS.mint}`,
        borderRadius: 2,
      }}
    >
      <CardMedia
        component="img"
        image={firstImage}
        alt={firstAlt}
        sx={{
          aspectRatio: "16/9",
          width: "100%",
          height: "auto",
          objectFit: "cover",
        }}
      />
      <CardContent sx={{ pt: 1.75 }}>
        <Stack spacing={0.25} alignItems="center">
          <Typography component="h3" variant="h6">
            {v.name}
          </Typography>

          {place && <Typography sx={{ opacity: 0.7 }}>{place}</Typography>}
        </Stack>

        <Stack spacing={0.5} sx={{ mt: 1.75 }}>
          <Typography sx={{ fontFamily: FONTS.sans }}>
            <strong>Your stay:</strong> {from.format("DD/MM/YY")} –{" "}
            {to.format("DD/MM/YY")}{" "}
          </Typography>
          <Typography sx={{ fontFamily: FONTS.sans }}>
            <strong>Your booked guests:</strong> {booking.guests}
          </Typography>
          <Typography sx={{ fontFamily: FONTS.sans }}>
            <strong>Your price:</strong> {total} kr
          </Typography>
        </Stack>
        <Stack alignItems="center" sx={{ mt: 1.5 }}>
          <Button
            component={RouterLink}
            to={`/venues/${v.id}`}
            variant="elevated"
            color="mint"
            sx={{ mt: 1 }}
          >
            View venue
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
