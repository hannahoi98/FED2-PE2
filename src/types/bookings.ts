/** Data for creating a booking. Dates are ISO strings. */
export type CreateBookingInput = {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
};

/** API response when a booking is successfully created. */
export type CreateBookingSuccess = {
  data: {
    id: string;
    dateFrom: string;
    dateTo: string;
    guests: number;
    created: string;
    updated: string;
    venueId?: string;
  };
  meta: Record<string, unknown>;
};

/** A booking as returned in a profile list. */
export type Booking = {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  /** Minimal venue info so we can render a card/link. */
  venue?: {
    id: string;
    name: string;
    media?: { url: string; alt?: string }[];
    location?: { city?: string | null; country?: string | null };
    price?: number;
  };
};

/** Response shape for GET /profiles/:name/bookings. */
export type ProfileBookingsResponse = {
  data: Booking[];
};
