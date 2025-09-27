import type { CreateVenueInput } from "../types/venue-input";

export const usernameRx = /^[A-Za-z0-9_]{3,20}$/;
export const noroffEmailRx = /^[A-Za-z0-9._%+-]+@stud\.noroff\.no$/i;
export const passwordRx = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

/** Username: 3–20 characters, letters/numbers/underscore. */
export function validateUsername(v: string) {
  if (!v) return "Username is required";
  if (!usernameRx.test(v)) return "3–20 chars, letters/numbers/_ only";
  return "";
}

/** Email: must be a stud.noroff.no address. */
export function validateEmail(v: string) {
  if (!v) return "Email is required";
  if (!noroffEmailRx.test(v)) return "Use your stud.noroff.no email";
  return "";
}

/** Password: at least 8 characters, includes a letter and a number. */
export function validatePassword(v: string) {
  if (!v) return "Password is required";
  if (!passwordRx.test(v)) return "Min 8 chars, include a letter and a number";
  return "";
}

export type VenueFormState = {
  name: string;
  description: string;
  price: number | string;
  maxGuests: number | string;
  media: { url: string; alt: string }[];
  meta: { wifi: boolean; parking: boolean; breakfast: boolean; pets: boolean };
  location: {
    address?: string;
    city: string;
    zip?: string;
    country: string;
    continent: string;
    lat?: number | string;
    lng?: number | string;
  };
};

export type VenueFormErrors = {
  name?: string;
  description?: string;
  price?: string;
  maxGuests?: string;
  media?: string;
  mediaItems?: { url?: string; alt?: string }[];
  location?: {
    city?: string;
    country?: string;
    continent?: string;
  };
};

export const isHttpUrl = (v: string) => /^https?:\/\/\S+/i.test(v.trim());

const nonEmpty = (s: string) => s.trim().length > 0;
const positiveInt = (n: number) => Number.isInteger(n) && n > 0;

/**
 * Validate the venue form and collect messages.
 * @returns `{ valid, errors }`
 */
export function validateVenueForm(form: VenueFormState) {
  const errors: VenueFormErrors = {};
  let valid = true;

  if (!nonEmpty(form.name)) {
    errors.name = "Title is required.";
    valid = false;
  }

  if (!nonEmpty(form.description)) {
    errors.description = "Description is required.";
    valid = false;
  }

  const priceNum = Number(form.price);
  if (!Number.isFinite(priceNum) || priceNum <= 0) {
    errors.price = "Price must be a positive number.";
    valid = false;
  }

  const guestsNum = Number(form.maxGuests);
  if (!positiveInt(guestsNum)) {
    errors.maxGuests = "Max guests must be a positive whole number.";
    valid = false;
  }

  if (!form.media || form.media.length === 0) {
    errors.media = "Add at least one image.";
    valid = false;
  } else {
    const itemErrors = form.media.map((m) => {
      const e: { url?: string; alt?: string } = {};
      if (!isHttpUrl(m.url)) e.url = "Enter a valid image URL.";
      if (!nonEmpty(m.alt)) e.alt = "Alt text is required.";
      return e;
    });
    if (itemErrors.some((e) => e.url || e.alt)) {
      errors.mediaItems = itemErrors;
      valid = false;
    }
  }

  const locErr: VenueFormErrors["location"] = {};
  if (!nonEmpty(form.location.city)) locErr.city = "City is required.";
  if (!nonEmpty(form.location.country)) locErr.country = "Country is required.";
  if (!nonEmpty(form.location.continent))
    locErr.continent = "Continent is required.";
  if (locErr.city || locErr.country || locErr.continent) {
    errors.location = locErr;
    valid = false;
  }

  return { valid, errors };
}

/** Map the form state to the API’s create-venue data. */
export function toCreateVenueData(form: VenueFormState): CreateVenueInput {
  return {
    name: form.name.trim(),
    description: form.description.trim(),
    media: form.media.map((m) => ({
      url: m.url.trim(),
      alt: m.alt.trim(),
    })),
    price: Number(form.price),
    maxGuests: Number(form.maxGuests),
    meta: form.meta,
    location: {
      address: form.location.address?.trim() || undefined,
      city: form.location.city.trim(),
      zip: form.location.zip?.trim() || undefined,
      country: form.location.country.trim(),
      continent: form.location.continent.trim(),
      lat:
        form.location.lat === "" || form.location.lat == null
          ? undefined
          : Number(form.location.lat),
      lng:
        form.location.lng === "" || form.location.lng == null
          ? undefined
          : Number(form.location.lng),
    },
  };
}
