import { ALL_VENUES_URL } from "../api/endpoints";
import type { Venue, VenueListResponse } from "../types/venue";
import VenueCard from "./VenueCard";
import Loader from "./Loader";
import { useEffect, useMemo, useState } from "react";
import { Alert, Box, Button, Stack } from "@mui/material";
import type { Dayjs } from "dayjs";

type Props = {
  query?: string;
  from?: Dayjs | null;
  to?: Dayjs | null;
};

const PER_PAGE = 12;

function hasImage(v: Venue) {
  return Array.isArray(v.media) && v.media.some((m) => m?.url?.trim());
}

const getTimestamp = (v: Venue) =>
  Date.parse(v.created ?? "") || Date.parse(v.updated ?? "") || 0;

const overlaps = (aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) =>
  aStart < bEnd && aEnd > bStart;

function isVenueAvailable(v: Venue, from: Dayjs | null, to: Dayjs | null) {
  if (!from || !to) return true;
  const start = from.startOf("day").toDate();
  const end = to.startOf("day").toDate();
  const bookings = v.bookings ?? [];
  return !bookings.some((b) => {
    const bStart = new Date(b.dateFrom);
    const bEnd = new Date(b.dateTo);
    return overlaps(start, end, bStart, bEnd);
  });
}

function matchesQuery(v: Venue, q: string) {
  if (!q) return true;
  const s = q.toLowerCase();
  return (
    v.name.toLowerCase().includes(s) ||
    (v.description ?? "").toLowerCase().includes(s) ||
    (v.location?.city ?? "").toLowerCase().includes(s) ||
    (v.location?.country ?? "").toLowerCase().includes(s)
  );
}

export default function AllVenuesGrid({
  query = "",
  from = null,
  to = null,
}: Props) {
  const [allVenues, setAllVenues] = useState<Venue[]>([]);
  const [visibleCount, setVisibleCount] = useState(PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const collected: Venue[] = [];
        let page = 1;
        let last = false;

        while (!last) {
          const url = new URL(ALL_VENUES_URL);
          url.searchParams.set("page", String(page));
          url.searchParams.set("limit", String(PER_PAGE));
          url.searchParams.set("_bookings", "true");

          const res = await fetch(url.toString());
          if (!res.ok)
            throw new Error(
              `Failed to load venues (page ${page}): ${res.status}`,
            );

          const json: VenueListResponse = await res.json();
          collected.push(...(json.data ?? []).filter(hasImage));

          const next = json.meta?.nextPage;
          last = Boolean(json.meta?.isLastPage ?? next == null);
          page = next ?? page + 1;
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
          const msg =
            e instanceof Error
              ? e.message
              : "Something went wrong while loading venues";
          setError(msg);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = (query ?? "").trim();
    return allVenues.filter(
      (v) => matchesQuery(v, q) && isVenueAvailable(v, from, to),
    );
  }, [allVenues, query, from, to]);

  useEffect(() => {
    setVisibleCount(PER_PAGE);
  }, [query, from, to]);

  if (loading) return <Loader message="Loading venues…" />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!allVenues.length)
    return <Alert severity="info">No venues matches your search.</Alert>;

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

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
      <Box sx={{ display: "grid", placeItems: "center", pt: 2 }}>
        <Button
          variant="elevated"
          color="pine"
          onClick={() => setVisibleCount((n) => n + PER_PAGE)}
          disabled={!hasMore}
        >
          {hasMore ? "View more venues" : "No more venues"}
        </Button>
      </Box>
    </Stack>
  );
}
