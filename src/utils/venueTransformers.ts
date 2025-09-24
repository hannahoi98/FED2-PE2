import type { Venue } from "../types/venue";
import type { VenueFormState } from "./validation";

export function toVenueFormState(venue: Venue): VenueFormState {
  return {
    name: venue.name ?? "",
    description: venue.description ?? "",
    price: venue.price ?? "",
    maxGuests: venue.maxGuests ?? "",
    media: (venue.media ?? []).map((m) => ({
      url: m.url ?? "",
      alt: m.alt ?? "",
    })),
    meta: {
      wifi: Boolean(venue.meta?.wifi),
      parking: Boolean(venue.meta?.parking),
      breakfast: Boolean(venue.meta?.breakfast),
      pets: Boolean(venue.meta?.pets),
    },
    location: {
      city: venue.location?.city ?? "",
      country: venue.location?.country ?? "",
      continent: venue.location?.continent ?? "",
    },
  };
}
