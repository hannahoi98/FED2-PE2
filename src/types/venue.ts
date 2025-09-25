// Types for venue data from the API

export type VenueMedia = {
  url: string;
  alt?: string;
};

export type VenueMeta = {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
};

export type VenueLocation = {
  address?: string;
  city?: string;
  zip?: string;
  country?: string;
  continent?: string;
  lat?: number;
  lng?: number;
};

export type BookingCustomer = {
  name: string;
  email: string;
  avatar?: { url: string; alt?: string };
  banner?: { url: string; alt?: string };
  bio?: string;
};

export type VenueBooking = {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created?: string;
  updated?: string;
  customer?: BookingCustomer;
};

export type VenueOwner = {
  name: string;
  email?: string;
  avatar?: { url?: string; alt?: string } | null;
};

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
