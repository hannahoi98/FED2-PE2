import type { Venue } from "../types/venue";
import { SINGLE_VENUE_URL, withQuery } from "../api/endpoints";
import { useState, useEffect } from "react";

type SingleVenueResponse = { data: Venue };

export function useVenue(id: string | undefined, preloaded?: Venue | null) {
  const [venue, setVenue] = useState<Venue | null>(preloaded ?? null);
  const [loading, setLoading] = useState(!preloaded);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || venue) return;
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const url = withQuery(SINGLE_VENUE_URL(id), {
          _owner: true,
          _bookings: true,
        });

        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to load venue (${res.status})`);
        const json: SingleVenueResponse = await res.json();
        if (!cancelled) setVenue(json.data);
      } catch (e: unknown) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Something went wrong");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id, venue]);

  return { venue, loading, error };
}
