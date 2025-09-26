import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { COLORS, FONTS } from "../theme";
import type { Venue } from "../types/venue";

type Props = { venue: Venue };

/**
 * Compact card preview for a venue.
 *
 * @param props - component props
 * @returns card with image, title, rating, meta and a details link
 */
export default function VenueCard({ venue }: Props) {
  const firstImage = venue.media?.[0]?.url ?? " ";
  const firstAlt = venue.media?.[0]!.alt ?? venue.name;

  const city = venue.location?.city;
  const country = venue.location?.country;
  const place = [city, country].filter(Boolean).join(", ");

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
        <Stack spacing={0.75} alignItems="center">
          <Typography component="h3" variant="h6">
            {venue.name}
          </Typography>
          <Typography sx={{ fontFamily: FONTS.sans }}>{place}</Typography>
          <Stack direction="row" spacing={1}>
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
                  aria-label={`Rating ${venue.rating.toFixed(1)} out of 5`}
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
            <Divider orientation="vertical" flexItem />
            <Typography sx={{ fontFamily: FONTS.sans }}>
              {venue.maxGuests} Guests
            </Typography>
          </Stack>
          <Typography sx={{ fontFamily: FONTS.sans }}>
            {venue.price} kr / night
          </Typography>
          <Button
            component={RouterLink}
            to={`/venues/${venue.id}`}
            variant="elevated"
            color="mint"
          >
            View venue
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
