import type {
  VenueFormState,
  VenueFormErrors,
} from "../../../utils/validation";
import { validateVenueForm } from "../../../utils/validation";
import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type Props = {
  initial?: Partial<VenueFormState>;
  submitLabel?: string;
  submitting?: boolean;
  serverError?: string | null;
  onSubmit: (form: VenueFormState) => Promise<void> | void;
  onCancel?: () => void;
};

const defaultForm: VenueFormState = {
  name: "",
  description: "",
  price: "",
  maxGuests: "",
  media: [{ url: "", alt: "" }],
  meta: { wifi: false, parking: false, breakfast: false, pets: false },
  location: {
    address: "",
    city: "",
    zip: "",
    country: "",
    continent: "",
    lat: "",
    lng: "",
  },
};

export default function VenueForm({
  initial,
  submitLabel = "Save venue",
  submitting = false,
  serverError,
  onSubmit,
  onCancel,
}: Props) {
  const [form, setForm] = useState<VenueFormState>({
    ...defaultForm,
    ...initial,
    meta: { ...defaultForm.meta, ...(initial?.meta ?? {}) },
    location: { ...defaultForm.location, ...(initial?.location ?? {}) },
    media: initial?.media?.length ? initial.media : defaultForm.media,
  });

  const [errors, setErrors] = useState<VenueFormErrors>({});
  const [clientError, setClientError] = useState<string | null>(null);

  const setField =
    <K extends keyof VenueFormState>(key: K) =>
    (value: VenueFormState[K]) =>
      setForm((f) => ({ ...f, [key]: value }));

  const setLocation =
    <K extends keyof VenueFormState["location"]>(key: K) =>
    (value: VenueFormState["location"][K]) =>
      setForm((f) => ({ ...f, location: { ...f.location, [key]: value } }));

  const setMeta =
    <K extends keyof VenueFormState["meta"]>(key: K) =>
    (value: boolean) =>
      setForm((f) => ({ ...f, meta: { ...f.meta, [key]: value } }));

  const setMediaField = (idx: number, field: "url" | "alt", val: string) =>
    setForm((f) => {
      const next = [...f.media];
      next[idx] = { ...next[idx], [field]: val };
      return { ...f, media: next };
    });

  const addMedia = () =>
    setForm((f) => ({ ...f, media: [...f.media, { url: "", alt: "" }] }));

  const removeMedia = (idx: number) =>
    setForm((f) => ({
      ...f,
      media: f.media.filter((_, i) => i !== idx),
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setClientError(null);

    const { valid, errors: nextErrors } = validateVenueForm(form);
    setErrors(nextErrors);
    if (!valid) {
      setClientError("Please fill inn the missing fields.");
      return;
    }
    await onSubmit(form);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack>
        {(clientError || serverError) && (
          <Alert severity="error">{clientError || serverError}</Alert>
        )}

        <TextField
          label="Title"
          value={form.name}
          onChange={(e) => setField("name")(e.target.value)}
          error={!!errors.name}
          helperText={errors.name || "Please include a title for you venue"}
          required
          fullWidth
        />

        <TextField
          label="Description"
          value={form.description}
          onChange={(e) => setField("description")(e.target.value)}
          error={!!errors.description}
          helperText={
            errors.description || "Please include a description for you venue"
          }
          required
          fullWidth
          multiline
          minRows={4}
        />

        <Stack>
          <Typography variant="h6">Images</Typography>
          {errors.media && <Alert severity="warning">{errors.media}</Alert>}

          <Stack>
            {form.media.map((m, i) => {
              const itemErr = errors.mediaItems?.[i] ?? {};
              return (
                <Stack key={i} spacing={1}>
                  <TextField
                    label="Image URL"
                    value={m.url}
                    onChange={(e) => setMediaField(i, "url", e.target.value)}
                    error={!!itemErr.url}
                    helperText={itemErr.url || ""}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Alt text"
                    value={m.alt}
                    onChange={(e) => setMediaField(i, "alt", e.target.value)}
                    error={!!itemErr.alt}
                    helperText={itemErr.alt || ""}
                    required
                    fullWidth
                  />
                  {form.media.length > 1 && (
                    <Button
                      variant="elevated"
                      color="white"
                      onClick={() => removeMedia(i)}
                      disabled={submitting}
                      sx={{ alignSelf: "flex-start" }}
                    >
                      Remove this image
                    </Button>
                  )}
                </Stack>
              );
            })}
          </Stack>
          <Button
            variant="elevated"
            color="mint"
            onClick={addMedia}
            disabled={submitting}
            sx={{ alignSelf: "flex-start" }}
          >
            Add another image
          </Button>
        </Stack>
        <TextField
          label="Price per night (kr)"
          type="number"
          value={form.price}
          onChange={(e) => setField("price")(e.target.value)}
          error={!!errors.price}
          helperText={errors.price || ""}
          required
          fullWidth
        />

        <TextField
          label="Max guests"
          type="number"
          value={form.maxGuests}
          onChange={(e) => setField("maxGuests")(e.target.value)}
          error={!!errors.maxGuests}
          helperText={errors.maxGuests || ""}
          required
          fullWidth
        />
        <Stack>
          <Typography variant="h6">Amenities</Typography>
          {(["wifi", "parking", "breakfast", "pets"] as const).map((key) => (
            <FormControl key={key}>
              <FormLabel sx={{ textTransform: "capitalize" }}>{key}</FormLabel>
              <RadioGroup
                row
                value={form.meta[key] ? "yes" : "no"}
                onChange={(e) => setMeta(key)(e.target.value === "yes")}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          ))}
        </Stack>
        <Stack>
          <TextField
            label="City"
            value={form.location.city}
            onChange={(e) => setLocation("city")(e.target.value)}
            error={!!errors.location?.city}
            helperText={errors.location?.city || ""}
            required
            fullWidth
          />

          <TextField
            label="Country"
            value={form.location.country}
            onChange={(e) => setLocation("country")(e.target.value)}
            error={!!errors.location?.country}
            helperText={errors.location?.country || ""}
            required
            fullWidth
          />

          <TextField
            label="Continent"
            value={form.location.continent}
            onChange={(e) => setLocation("continent")(e.target.value)}
            error={!!errors.location?.continent}
            helperText={errors.location?.continent || ""}
            required
            fullWidth
          />
        </Stack>
        <Stack>
          <Button
            type="submit"
            variant="elevated"
            color="mint"
            disabled={submitting}
          >
            {submitting ? "Saving…" : submitLabel}
          </Button>
          {onCancel && (
            <Button
              variant="elevated"
              color="white"
              onClick={onCancel}
              disabled={submitting}
            >
              Cancel
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
