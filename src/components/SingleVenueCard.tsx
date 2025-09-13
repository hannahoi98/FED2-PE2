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

  const onBook = () => {
    if (isAuthenticated) {
      navigate(`/venues/${venue.id}/book`);
    } else {
      navigate(`/auth/login?redirect=/venues/${venue.id}`);
    }
  };

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
            <Typography variant="body2" sx={{ opacity: 0.75 }}>
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

          {venue.description && (
            <Card elevation={0}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  About this venue
                </Typography>
                <Typography sx={{ fontFamily: FONTS.sans }}>
                  {venue.description}
                </Typography>

                <Button variant="elevated" color="mint" onClick={onBook}>
                  Book this venue
                </Button>
              </CardContent>
            </Card>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
