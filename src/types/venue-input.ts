import type { VenueMedia, VenueMeta, VenueLocation } from "./venue";

type WithRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
type PickRequired<T, K extends keyof T> = Required<Pick<T, K>>;

export type VenueMediaRequiredAlt = WithRequired<VenueMedia, "alt">;

export type VenueLocationCreate = VenueLocation &
  PickRequired<VenueLocation, "city" | "country" | "continent">;

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
