import { useLocation, useParams } from "react-router-dom";
import { Alert } from "@mui/material";
import Loader from "../components/Loader";
import SingleVenueCard from "../components/SingleVenueCard";
import { useVenue } from "../hooks/useVenue";
import type { Venue } from "../types/venue";

/**
 * Page for a single venue.
 * Tries to use a preloaded venue from navigation state, otherwise fetches by id.
 *
 * @returns The venue page or a simple alert for error states
 */
export default function SingleVenue() {
  const { id } = useParams<{ id: string }>();
  const preloaded =
    (useLocation().state as { venue?: Venue } | null)?.venue ?? null;

  const { venue, loading, error } = useVenue(id, preloaded);

  if (!id) return <Alert severity="error">Missing venue ID.</Alert>;
  if (loading) return <Loader message="Loading venue…" />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!venue) return <Alert severity="warning">Venue not found.</Alert>;

  return <SingleVenueCard venue={venue} />;
}
