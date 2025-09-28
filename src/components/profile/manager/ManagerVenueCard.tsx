import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
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
import { deleteVenue } from "../../../api/venue";
import { COLORS } from "../../../theme";
import type { Venue } from "../../../types/venue";

type Props = {
  venue: Venue;
  token: string;
  /** Called after delete succeeds so the parent can remove the card. */
  onDeleted?: (id: string) => void;
};

/**
 * Compact manager card with quick actions: view, edit, delete.
 */
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
        display: "flex",
        flexDirection: "column",
        height: "100%",
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

      <CardContent
        sx={{
          p: { xs: 2, sm: 2.5 },
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          minHeight: 0,
        }}
      >
        <Stack spacing={1.5} alignItems="stretch" sx={{ minHeight: 48 }}>
          <Typography
            component="h3"
            variant="h6"
            sx={{
              textAlign: "center",
              width: "100%",
              minWidth: 0,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {venue.name}
          </Typography>

          {error && (
            <Alert sx={{ mt: 1 }} severity="error">
              {error}
            </Alert>
          )}

          <Box sx={{ mt: "auto" }}>
            <Button
              component={RouterLink}
              to={`/venues/${venue.id}`}
              variant="elevated"
              color="mint"
              disabled={busy}
              sx={{ width: "100%", mb: 1 }}
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
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
