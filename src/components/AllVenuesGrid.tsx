import { ALL_VENUES_URL } from "../api/endpoints";
import type { Venue, VenueListResponse } from "../types/venue";
import VenueCard from "./VenueCard";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import { Alert, Box } from "@mui/material";

function hasImage(v: Venue) {
  return Array.isArray(v.media) && v.media.some((m) => m?.url?.trim());
}

export default function AllVenuesGrid() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(ALL_VENUES_URL);
        if (!res.ok) throw new Error(`Failed to load venues (${res.status})`);

        const json: VenueListResponse = await res.json();
        const withImages = (json.data ?? []).filter(hasImage);

        if (!cancelled) setVenues(withImages);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Something went wrong";
        if (!cancelled) setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <Loader message="Loading venues…" />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!venues.length) return <Alert severity="info">No venues found.</Alert>;

  return (
    <Box
      display="grid"
      gap={3}
      gridTemplateColumns={{
        xs: "1fr",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
      }}
    >
      {venues.map((v) => (
        <Box key={v.id}>
          <VenueCard venue={v} />
        </Box>
      ))}
    </Box>
  );
}
