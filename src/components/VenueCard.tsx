import type { Venue } from "../types/venue";
import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";

type Props = { venue: Venue };

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
        sx={{ height: 200, objectFit: "cover" }}
      />

      <CardContent>
        <Stack>
          <Typography>{venue.name}</Typography>
          <Typography>{place}</Typography>
          <Stack direction="row">
            <Rating
              value={venue.rating ?? 0}
              precision={0.5}
              readOnly
              size="small"
            />
            <Typography>{venue.rating?.toFixed?.(1) ?? "0.0"}</Typography>
            <Typography>{venue.maxGuests} guests</Typography>
          </Stack>
          <Typography>{venue.price} kr / night</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
