import { useState } from "react";
import { deleteVenue } from "../../api/venue";
import type { Venue } from "../../types/venue";
import {
  Alert,
  Button,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

type Props = {
  venue: Venue;
  token: string;
  onDeleted?: (id: string) => void;
};

export default function ManagerVenueCard({ venue, token, onDeleted }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const firstImage = venue.media?.[0]?.url ?? " ";
  const firstAlt = venue.media?.[0]?.alt ?? venue.name;

  async function handleDelete() {
    setError(null);
    if (!confirm(`Delete “${venue.name}”? This cannot be undone.`)) return;

    try {
      setBusy(true);
      await deleteVenue(venue.id, token);
      onDeleted?.(venue.id);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Could not delete venue");
    } finally {
      setBusy(false);
    }
  }

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
        <Stack>
          <Typography component="h3" variant="h6">
            {venue.name}
          </Typography>
        </Stack>

        {error && (
          <Alert sx={{ mt: 1 }} severity="error">
            {error}
          </Alert>
        )}

        <Stack>
          <Button
            component={RouterLink}
            to={`/venues/${venue.id}`}
            variant="elevated"
            color="mint"
            disabled={busy}
          >
            View venue
          </Button>
          <Button
            component={RouterLink}
            to={`/venues/${venue.id}/edit`}
            variant="elevated"
            color="white"
            disabled={busy}
            sx={{ width: 160 }}
          >
            Edit venue
          </Button>
          <Button
            variant="elevated"
            color="pine"
            onClick={handleDelete}
            disabled={busy}
            sx={{ width: 160 }}
          >
            {busy ? "Deleting…" : "Delete"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
