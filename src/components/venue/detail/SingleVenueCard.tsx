import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Dayjs } from "dayjs";
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Typography,
  Stack,
  Rating,
  TextField,
  Box,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AvailabilityPicker from "../../ui/AvailabilityPicker";
import { createBooking } from "../../../api/bookings";
import { loadAuth } from "../../../utils/authStorage";
import { COLORS, FONTS } from "../../../theme";
import type { Venue } from "../../../types/venue";

type Props = {
  venue: Venue;
};

/**
 * Full-page card for a venue.
 * Shows details, availability picker, and a booking box on the right.
 *
 * @param props Component props
 * @returns The venue details and booking UI
 */
export default function SingleVenueCard({ venue }: Props) {
  const navigate = useNavigate();

  const auth = loadAuth();
  const token = auth?.accessToken ?? "";

  // Roles
  type VenueWithOwner = Venue & { owner?: { name?: string } };
  const ownerName = (venue as VenueWithOwner).owner?.name;
  const isAuthenticated = !!auth;
  const isManager = !!auth?.venueManager;
  const isOwner = ownerName === auth?.name;
  const roleAllowsBooking = !isManager || (isManager && !isOwner);

  // Hero image
  const firstImage = venue.media?.[0]?.url ?? " ";
  const firstAlt = venue.media?.[0]?.alt ?? venue.name;

  const place = [venue.location?.city, venue.location?.country]
    .filter(Boolean)
    .join(", ");

  // Form state
  const [checkIn, setCheckIn] = useState<Dayjs | null>(null);
  const [checkOut, setCheckOut] = useState<Dayjs | null>(null);
  const [guests, setGuests] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    return Math.max(
      0,
      checkOut.startOf("day").diff(checkIn.startOf("day"), "day"),
    );
  }, [checkIn, checkOut]);

  const canSelectDates = Boolean(checkIn && checkOut);
  const canBook = canSelectDates && guests > 0 && guests <= venue.maxGuests;
  const canSubmit =
    isAuthenticated && roleAllowsBooking && canBook && !submitting;

  const onBookClick = async () => {
    setServerError(null);
    setServerSuccess(null);

    if (!isAuthenticated) {
      navigate(`/auth/login`, { state: { from: `/venues/${venue.id}` } });
      return;
    }

    if (!roleAllowsBooking) {
      setServerError("You can’t book your own venue.");
      return;
    }

    if (!canBook || !checkIn || !checkOut) return;

    try {
      setSubmitting(true);
      await createBooking(
        {
          dateFrom: checkIn.startOf("day").toDate().toISOString(),
          dateTo: checkOut.startOf("day").toDate().toISOString(),
          guests,
          venueId: venue.id,
        },
        token,
      );
      setServerSuccess("Booking confirmed! 🎉");
      navigate("/profile");
      setCheckIn(null);
      setCheckOut(null);
      setGuests(1);
    } catch (e: unknown) {
      setServerError(e instanceof Error ? e.message : "Booking failed");
    } finally {
      setSubmitting(false);
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
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
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
                  aria-label={`Rating ${Number(venue.rating).toFixed(1)} out of 5`}
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

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "minmax(0,1fr) 380px",
              lg: "minmax(0,1fr) 380px",
            },
            gap: { xs: 3, md: 4 },
            alignItems: "start",
          }}
        >
          <Stack alignItems="flex-start" gap={2.5}>
            {venue.description && (
              <Stack>
                <Typography variant="h6">About this venue</Typography>
                <Typography sx={{ fontFamily: FONTS.sans }}>
                  {venue.description}
                </Typography>
              </Stack>
            )}
            <Stack>
              <Typography variant="h6">Amenities</Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1.25, sm: 2 }}
                justifyContent="center"
                sx={{ flexWrap: "wrap", rowGap: 1.5, columnGap: 2 }}
              >
                {FEATURES.map(({ key, label }) => (
                  <FeatureItem
                    key={key}
                    ok={Boolean(meta[key])}
                    label={label}
                  />
                ))}
              </Stack>
            </Stack>
            <Stack>
              <Typography variant="h6">Price</Typography>
              <Typography sx={{ fontFamily: FONTS.sans }}>
                {venue.price} kr / night
              </Typography>
            </Stack>
          </Stack>
          <Stack
            gap={2}
            sx={{
              p: { xs: 2, md: 2.5 },
              border: `1px solid ${COLORS.mint}`,
              borderRadius: 2,
              position: { md: "sticky" },
              top: { md: 88 },
              maxWidth: { xs: "100%", md: 380 },
              justifySelf: { md: "end" },
            }}
          >
            <Typography variant="h6" mb={1}>
              Book This Venue
            </Typography>
            {serverError && <Alert severity="error">{serverError}</Alert>}
            {serverSuccess && <Alert severity="success">{serverSuccess}</Alert>}

            <Stack
              direction={{ xs: "column", md: "row" }}
              gap={2}
              alignItems="flex-start"
              flexWrap="wrap"
              sx={{ width: "100%" }}
            >
              <AvailabilityPicker
                bookings={venue.bookings}
                checkIn={checkIn}
                checkOut={checkOut}
                onChange={({ checkIn, checkOut }) => {
                  setCheckIn(checkIn);
                  setCheckOut(checkOut);
                }}
              />
              <Stack spacing={0.5}>
                <Chip
                  label="Guests"
                  size="small"
                  variant="outlined"
                  sx={{
                    alignSelf: "flex-start",
                    bgcolor: COLORS.mint,
                    border: `1px solid ${COLORS.mint}`,
                    color: COLORS.pine,
                    fontFamily: FONTS.sans,
                    height: 24,
                  }}
                />
                <TextField
                  type="number"
                  size="small"
                  inputProps={{ min: 1, max: venue.maxGuests }}
                  value={guests}
                  onChange={(e) =>
                    setGuests(
                      Math.max(
                        1,
                        Math.min(venue.maxGuests, Number(e.target.value) || 1),
                      ),
                    )
                  }
                  sx={{ width: { xs: "100%", sm: 160 } }}
                  helperText={`Max ${venue.maxGuests} guests`}
                />
              </Stack>
              <Stack
                sx={{
                  p: 1.5,
                  borderRadius: 1,
                  width: { xs: "100%", sm: 200 },
                  bgcolor: "rgba(142, 197, 190, 0.12)",
                }}
              >
                {canSelectDates ? (
                  <>
                    <Typography sx={{ fontFamily: FONTS.sans }}>
                      <strong>Price:</strong> {nights * venue.price} kr
                    </Typography>
                    <Typography sx={{ fontFamily: FONTS.sans }}>
                      <strong>Guests:</strong> {guests}
                    </Typography>
                  </>
                ) : (
                  <Typography sx={{ fontFamily: FONTS.sans }}>
                    Select dates to see the total
                  </Typography>
                )}
              </Stack>
              <Button
                variant="elevated"
                color="pine"
                onClick={onBookClick}
                disabled={!canSubmit}
                sx={{ width: 200 }}
              >
                {!isAuthenticated
                  ? "Login to book"
                  : isManager && isOwner
                    ? "This is your venue"
                    : submitting
                      ? "Booking…"
                      : canBook
                        ? "Confirm booking"
                        : "Select dates & guests"}
              </Button>
              <Button
                variant="elevated"
                color="white"
                component={RouterLink}
                to="/"
                sx={{ width: 200 }}
              >
                Back to all venues
              </Button>
              {isAuthenticated && isManager && isOwner && (
                <Alert severity="info" sx={{ mt: 1 }}>
                  You can’t book your own venue.
                </Alert>
              )}
            </Stack>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
