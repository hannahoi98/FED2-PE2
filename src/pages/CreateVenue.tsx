import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Alert,
  Card,
  CardContent,
  Divider,
  Typography,
  Stack,
} from "@mui/material";
import VenueForm from "../components/venue/manageVenue/VenueForm";
import { loadAuth } from "../utils/authStorage";
import { CreateVenue as createVenueApi } from "../api/venue";
import { toCreateVenueData, type VenueFormState } from "../utils/validation";
import type { Venue } from "../types/venue";

/**
 * CreateVenuePage
 *
 * Page for creating a new venue.
 * - Guards: requires an authenticated venue manager; otherwise redirects
 *   to /auth/login (no auth) or / (not a manager).
 * - Renders `VenueForm` with empty defaults.
 * - On submit, transforms to API shape with `toCreateVenueData`, calls
 *   `CreateVenue`, and navigates to the newly created venue detail page.
 * - Shows a top-level error alert if creation fails and disables the form
 *   while a request is in flight.
 */
export default function CreateVenuePage() {
  const auth = loadAuth();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  if (!auth) return <Navigate to="/auth/login" replace />;
  if (!auth.venueManager) return <Navigate to="/" replace />;

  const token = auth.accessToken;

  async function handleSubmit(form: VenueFormState) {
    setServerError(null);
    try {
      setSubmitting(true);
      const body = toCreateVenueData(form);
      const res = await createVenueApi<Venue>(body, token);
      const venueId = res.data.id;
      navigate(`/venues/${venueId}`);
    } catch (e: unknown) {
      setServerError(e instanceof Error ? e.message : "Failed to create venue");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Stack
      spacing={2.5}
      sx={{
        maxWidth: { xs: 600, md: 760 },
        mx: "auto",
        px: { xs: 2, sm: 3 },
      }}
    >
      <Card>
        <CardContent sx={{ p: { xs: 3, sm: 4, md: 6 } }}>
          <Typography component="h1" variant="h4" align="center" sx={{ mb: 1 }}>
            Create a New Venue
          </Typography>
          <Divider sx={{ opacity: 1, mb: 4 }} />
          {serverError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {serverError}
            </Alert>
          )}
          <VenueForm
            submitLabel="Create venue"
            submitting={submitting}
            serverError={serverError}
            onSubmit={handleSubmit}
            onCancel={() => navigate(-1)}
          />
        </CardContent>
      </Card>
    </Stack>
  );
}
