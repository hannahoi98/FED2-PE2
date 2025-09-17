import type { Venue } from "../types/venue";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  Stack,
  Rating,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { COLORS, FONTS } from "../theme";
import { Dayjs } from "dayjs";
import AvailabilityPicker from "./AvailabilityPicker";
import { useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

type Props = {
  venue: Venue;
  isAuthenticated?: boolean;
};

export default function SingleVenueCard({
  venue,
  isAuthenticated = false,
}: Props) {
  const navigate = useNavigate();

  const firstImage = venue.media?.[0]?.url ?? " ";
  const firstAlt = venue.media?.[0]?.alt ?? venue.name;

  const place = [venue.location?.city, venue.location?.country]
    .filter(Boolean)
    .join(", ");

  const [checkIn, setCheckIn] = useState<Dayjs | null>(null);
  const [checkOut, setCheckOut] = useState<Dayjs | null>(null);
  const canBook = Boolean(checkIn && checkOut);

  const onBook = () => {
    if (isAuthenticated) {
      navigate(`/venues/${venue.id}/book`);
    } else {
      navigate(`/auth/login?redirect=/venues/${venue.id}`);
    }
  };

  const meta = venue.meta ?? {
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  };

  const FEATURES: { key: keyof typeof meta; label: string }[] = [
    { key: "wifi", label: "Wi-Fi" },
    { key: "parking", label: "Parking" },
    { key: "breakfast", label: "Breakfast" },
    { key: "pets", label: "Pets" },
  ];

  const FeatureItem = ({ ok, label }: { ok: boolean; label: string }) => (
    <Stack direction="row" spacing={1} alignItems="center">
      {ok ? (
        <CheckCircleOutlineIcon fontSize="small" sx={{ color: COLORS.pine }} />
      ) : (
        <HighlightOffIcon fontSize="small" sx={{ color: COLORS.mint }} />
      )}
      <Typography sx={{ fontFamily: FONTS.sans, opacity: ok ? 1 : 0.7 }}>
        {label}
      </Typography>
    </Stack>
  );

  return (
    <Card>
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

      <CardContent>
        <Stack alignItems="center">
          <Typography component="h1" variant="h4">
            {venue.name}
          </Typography>

          {place && (
            <Typography variant="h6" sx={{ opacity: 0.75 }}>
              {place}
            </Typography>
          )}

          <Stack direction="row" spacing={1} alignItems="center">
            {venue.rating > 0 ? (
              <>
                <Rating
                  value={venue.rating}
                  precision={0.5}
                  readOnly
                  size="small"
                  sx={{
                    "& .MuiRating-iconFilled": { color: COLORS.pine },
                    "& .MuiRating-iconEmpty": { color: "rgba(9,63,59,0.3)" },
                  }}
                />
                <Typography sx={{ fontFamily: FONTS.sans }}>
                  {venue.rating.toFixed(1)}
                </Typography>
              </>
            ) : (
              <Typography sx={{ fontFamily: FONTS.sans }}>
                No ratings yet
              </Typography>
            )}

            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 1, borderColor: COLORS.mint, opacity: 1 }}
            />

            <Typography sx={{ fontFamily: FONTS.sans }}>
              {venue.maxGuests} Guests
            </Typography>
          </Stack>
        </Stack>
        <Stack alignItems="flex-start" gap={2}>
          {venue.description && (
            <Card elevation={0}>
              <CardContent>
                <Typography variant="h6">About this venue</Typography>
                <Typography sx={{ fontFamily: FONTS.sans }}>
                  {venue.description}
                </Typography>
              </CardContent>
            </Card>
          )}
          <Card elevation={0}>
            <CardContent>
              <Typography variant="h6">Ameneties</Typography>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                sx={{ flexWrap: "wrap", rowGap: 1, my: 0.5 }}
              >
                {FEATURES.map(({ key, label }) => (
                  <FeatureItem
                    key={key}
                    ok={Boolean(meta[key])}
                    label={label}
                  />
                ))}
              </Stack>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Price
              </Typography>
              <Typography sx={{ fontFamily: FONTS.sans }}>
                {venue.price} kr / night
              </Typography>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Pick Your Dates
              </Typography>
              <AvailabilityPicker
                bookings={venue.bookings}
                checkIn={checkIn}
                checkOut={checkOut}
                onChange={({ checkIn, checkOut }) => {
                  setCheckIn(checkIn);
                  setCheckOut(checkOut);
                }}
              />
              <Button
                variant="elevated"
                color="mint"
                onClick={onBook}
                disabled={!canBook}
              >
                {canBook ? "Book this venue" : "Select dates to book"}
              </Button>
              <Button
                variant="elevated"
                color="white"
                onClick={() => navigate("/")}
              >
                Back to all venues
              </Button>
            </CardContent>
          </Card>
        </Stack>
      </CardContent>
    </Card>
  );
}
