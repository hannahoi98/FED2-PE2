import { ALL_VENUES_URL } from "../api/endpoints";
import type { Venue, VenueListResponse } from "../types/venue";
import VenueCard from "./VenueCard";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import { Alert, Box, Button, Stack } from "@mui/material";

const PER_PAGE = 12;

function hasImage(v: Venue) {
  return Array.isArray(v.media) && v.media.some((m) => m?.url?.trim());
}

const getTimestamp = (v: Venue) => {
  const c = v.created ?? v.created ?? "";
  const u = v.updated ?? v.updated ?? "";
  return Date.parse(c) || Date.parse(u) || 0;
};

export default function AllVenuesGrid() {
  const [allVenues, setAllVenues] = useState<Venue[]>([]);
  const [visibleCount, setVisibleCount] = useState(PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchAllPages = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const collected: Venue[] = [];
        let currentPage = 1;
        let lastPage = false;

        while (!lastPage) {
          const url = new URL(ALL_VENUES_URL);

          url.searchParams.set("page", String(currentPage));
          url.searchParams.set("limit", String(PER_PAGE));

          const res = await fetch(url.toString());
          if (!res.ok) {
            throw new Error(
              `Failed to load venues (page ${currentPage}): ${res.status}`,
            );
          }

          const json: VenueListResponse = await res.json();

          collected.push(...(json.data ?? []).filter(hasImage));

          const next = json.meta?.nextPage;
          lastPage = Boolean(json.meta?.isLastPage ?? next == null);
          currentPage = next ?? currentPage + 1;
        }

        const map = new Map<string, Venue>();
        for (const v of collected) map.set(v.id, v);
        const sorted = Array.from(map.values()).sort(
          (a, b) => getTimestamp(b) - getTimestamp(a),
        );

        if (!cancelled) {
          setAllVenues(sorted);
          setVisibleCount(PER_PAGE);
        }
      } catch (e: unknown) {
        if (!cancelled) {
          const message =
            e instanceof Error
              ? e.message
              : "Something went wrong while loading venues";
          setError(message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchAllPages();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <Loader message="Loading venues…" />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!allVenues.length)
    return <Alert severity="info">No venues with photos yet.</Alert>;

  const visible = allVenues.slice(0, visibleCount);
  const hasMore = visibleCount < allVenues.length;

  return (
    <Stack>
      <Box
        display="grid"
        gap={3}
        gridTemplateColumns={{
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
      >
        {visible.map((v: Venue) => (
          <Box key={v.id}>
            <VenueCard venue={v} />
          </Box>
        ))}
      </Box>
      <Box sx={{ display: "grid", placeItems: "center", pt: 1 }}>
        <Button
          variant="elevated"
          color="mint"
          onClick={() => setVisibleCount((n) => n + PER_PAGE)}
          disabled={!hasMore}
        >
          {hasMore ? "View more venues" : "No more venues"}
        </Button>
      </Box>
    </Stack>
  );
}
