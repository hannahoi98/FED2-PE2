import { loadAuth } from "../utils/authStorage";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import type { Venue } from "../types/venue";
import Loader from "../components/Loader";
import { getVenue, updateVenue } from "../api/venue";
import { toCreateVenueData, type VenueFormState } from "../utils/validation";
import { toVenueFormState } from "../utils/venueTransformers";
import {
  Alert,
  Card,
  CardContent,
  Divider,
  Typography,
  Stack,
} from "@mui/material";
import VenueForm from "../components/venue/manageVenue/VenueForm";

/**
 * EditVenuePage
 *
 * Page for editing an existing venue.
 * - Guards: requires an authenticated venue manager; otherwise redirects
 *   to /auth/login (no auth) or / (not a manager).
 * - Fetches the venue by `id` (from route params) and pre-fills the form.
 * - On submit, validates with `toCreateVenueData` and calls `updateVenue`,
 *   then navigates back to the venue detail page.
 * - Displays loader while fetching; shows a top-level error alert on failure.
 */
export default function EditVenuePage() {
  const auth = loadAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState<VenueFormState | null>(
    null,
  );
  const [submitting, setSubmitting] = useState(false);

  const token: string | null = auth?.accessToken ?? null;

  // Fetch initial venue and map it into the form shape
  useEffect(() => {
    if (!id || !token || !auth?.venueManager) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const res = await getVenue<Venue>(id);
        setInitialValues(toVenueFormState(res.data));
      } catch (e: unknown) {
        setServerError(e instanceof Error ? e.message : "Failed to load venue");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, token, auth?.venueManager]);

  // Early redirects if not authenticated or not a venue manager
  if (!auth?.accessToken) return <Navigate to="/auth/login" replace />;
  if (!auth.venueManager) return <Navigate to="/" replace />;

  async function handleSubmit(form: VenueFormState) {
    setServerError(null);
    try {
      setSubmitting(true);
      if (!id) throw new Error("Missing venue ID");
      if (!token) throw new Error("Missing auth token");
      const body = toCreateVenueData(form);
      await updateVenue(id, body, token);
      navigate(`/venues/${id}`);
    } catch (e: unknown) {
      setServerError(e instanceof Error ? e.message : "Failed to update venue");
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Loader message="Loading venue…" minHeight={240} />
        </CardContent>
      </Card>
    );
  }

  if (serverError) {
    return (
      <Card>
        <CardContent>
          <Alert severity="error">{serverError}</Alert>
        </CardContent>
      </Card>
    );
  }

  if (!initialValues) return null;

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
            Edit Venue
          </Typography>
          <Divider sx={{ opacity: 1, mb: 4 }} />
          {serverError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {serverError}
            </Alert>
          )}
          <VenueForm
            initialValues={initialValues}
            submitLabel="Save changes"
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
