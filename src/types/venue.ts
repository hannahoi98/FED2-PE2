// Types for venue data from the API

/** One image for a venue. */
export type VenueMedia = {
  url: string;
  alt?: string;
};

/** Optional amenities/features for a venue. */
export type VenueMeta = {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
};

/** Optional address info. lat/lng are plain numbers (not strings). */
export type VenueLocation = {
  address?: string;
  city?: string;
  zip?: string;
  country?: string;
  continent?: string;
  lat?: number;
  lng?: number;
};

/** Basic info about the customer who booked. */
export type BookingCustomer = {
  name: string;
  email: string;
  avatar?: { url: string; alt?: string };
  banner?: { url: string; alt?: string };
  bio?: string;
};

/** One booking on a venue. Dates are ISO strings. */
export type VenueBooking = {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created?: string;
  updated?: string;
  customer?: BookingCustomer;
};

/** Basic info about the venue owner/manager. */
export type VenueOwner = {
  name: string;
  email?: string;
  avatar?: { url?: string; alt?: string } | null;
};

/** The main venue object we get from the API. */
export type Venue = {
  id: string;
  name: string;
  description?: string;
  media?: VenueMedia[];
  price: number;
  maxGuests: number;
  rating: number;
  created?: string;
  updated?: string;
  meta?: VenueMeta;
  location?: VenueLocation;
  bookings?: VenueBooking[];
  owner?: VenueOwner | null;
};

/** Paged list response when fetching many venues. */
export type VenueListResponse = {
  data: Venue[];
  meta: {
    isFirstPage: boolean;
    isLastPage: boolean;
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
    pageCount: number;
    totalCount: number;
  };
};
