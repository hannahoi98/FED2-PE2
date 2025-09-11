import type { Venue } from "../types/venue";
import { Card, CardContent, Typography } from "@mui/material";

type Props = { venue: Venue };

export default function SingleVenueCard({ venue }: Props) {
  const place = [venue.location?.city, venue.location?.country]
    .filter(Boolean)
    .join(", ");

  return (
    <Card>
      <CardContent>
        <Typography>{venue.name}</Typography>

        {place && (
          <Typography variant="body2" sx={{ opacity: 0.75 }}>
            {place}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
