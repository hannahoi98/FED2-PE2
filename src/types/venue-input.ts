import type { VenueMedia, VenueMeta, VenueLocation } from "./venue";

/** Utility: make K keys required on T. */
type WithRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
/** Utility: pick K keys from T and make them required. */
type PickRequired<T, K extends keyof T> = Required<Pick<T, K>>;

/** Same as VenueMedia but alt is required for creation. */
export type VenueMediaRequiredAlt = WithRequired<VenueMedia, "alt">;

/** Location for creation: city, country, continent must be present. */
export type VenueLocationCreate = VenueLocation &
  PickRequired<VenueLocation, "city" | "country" | "continent">;

/**
 * Data to create a new venue.
 * (Matches what the API expects on POST /venues.)
 */
export type CreateVenueInput = {
  name: string;
  description: string;
  media: VenueMediaRequiredAlt[];
  price: number;
  maxGuests: number;
  rating?: number;
  meta?: VenueMeta;
  location: VenueLocationCreate;
};

/** For updates we send the same shape as creation. */
export type UpdateVenueInput = CreateVenueInput;
