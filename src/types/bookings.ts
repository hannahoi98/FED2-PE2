export type CreateBookingInput = {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
};

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

export type Booking = {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue?: {
    id: string;
    name: string;
    media?: { url: string; alt?: string }[];
    location?: { city?: string | null; country?: string | null };
    price?: number;
  };
};

export type ProfileBookingsResponse = {
  data: Booking[];
};
