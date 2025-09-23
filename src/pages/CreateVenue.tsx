import { loadAuth } from "../utils/authStorage";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import type { Venue } from "../types/venue";
import { CreateVenue as createVenueApi } from "../api/venue";
import { toCreateVenueData, type VenueFormState } from "../utils/validation";
import { Alert, Card, CardContent, Typography } from "@mui/material";
import VenueForm from "../components/venue/manageVenue/VenueForm";

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
      setServerError(e instanceof Error ? e.message : "Create venue failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Create a New Venue
        </Typography>
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
  );
}
