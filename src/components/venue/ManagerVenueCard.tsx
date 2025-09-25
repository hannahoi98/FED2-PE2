import { useState } from "react";
import { deleteVenue } from "../../api/venue";
import type { Venue } from "../../types/venue";
import {
  Alert,
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { COLORS } from "../../theme";

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
    <Card
      sx={{
        border: `1px solid ${COLORS.mint}`,
        borderRadius: 2,
        overflow: "hidden",
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
      <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
        <Stack spacing={1} alignItems="stretch">
          <Typography component="h3" variant="h6" sx={{ textAlign: "center" }}>
            {venue.name}
          </Typography>

          {error && (
            <Alert sx={{ mt: 1 }} severity="error">
              {error}
            </Alert>
          )}

          <Button
            component={RouterLink}
            to={`/venues/${venue.id}`}
            variant="elevated"
            color="mint"
            disabled={busy}
            sx={{ flex: 1, width: { xs: "100%", sm: "auto" } }}
          >
            View venue
          </Button>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              component={RouterLink}
              to={`/venues/${venue.id}/edit`}
              variant="elevated"
              color="pine"
              disabled={busy}
              sx={{ flex: 1 }}
            >
              Edit venue
            </Button>
            <Button
              variant="elevated"
              color="white"
              onClick={handleDelete}
              disabled={busy}
              sx={{ flex: 1 }}
            >
              {busy ? "Deleting…" : "Delete"}
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
