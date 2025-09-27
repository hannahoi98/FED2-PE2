import { useState, useEffect } from "react";
import { SINGLE_VENUE_URL, withQuery } from "../api/endpoints";
import type { Venue } from "../types/venue";

/** API response for GET /venues/:id (single venue). */
type SingleVenueResponse = { data: Venue };

/**
 * useVenue
 *
 * Loads one venue by id and exposes simple state for the page.
 *
 * How it works (short):
 * - If you pass a `preloaded` venue (e.g. from the list page), we show that
 *   immediately and skip the initial loading spinner.
 * - If no preloaded venue is given, we fetch it by `id` (including _owner and _bookings).
 * - We handle errors and a basic "cancelled" flag to avoid setting state after unmount.
 *
 * @param id - The venue id from the URL (e.g. "id123"). If missing, nothing is fetched.
 * @param preloaded - Optional venue object already fetched earlier (for faster first paint).
 *
 * @returns {{ venue: Venue | null, loading: boolean, error: string | null }}
 *   - `venue`: the loaded venue, or `null` while loading / if not found.
 *   - `loading`: `true` while we’re fetching data.
 *   - `error`: a short error message if something went wrong, otherwise `null`.
 */
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
