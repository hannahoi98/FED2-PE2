import { useState, useEffect } from "react";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { UpdateProfileInput } from "../../api/profile";
import type { ProfileResponse } from "../../api/profile";

/**
 * Small form for changing the user's avatar.
 *
 * - Shows a preview when the URL looks valid
 * - Disables the button until something actually changed
 * - Returns the updated profile via onSuccess
 */
type Props = {
  /** Username to update (owner of the profile). */
  username: string;
  /** Bearer token for the request. */
  token: string;
  /** Current avatar URL, used to prefill the form. */
  initialUrl?: string;
  /** Current avatar alt text, used to prefill the form. */
  initialAlt?: string;
  /** Called when the user wants to close the form. */
  onClose: () => void;
  /** Called after a successful save with the updated profile. */
  onSuccess: (updated: ProfileResponse) => void;
};

const isValidUrl = (u: string) => /^https?:\/\//i.test(u.trim());

export default function EditAvatar({
  username,
  token,
  initialUrl = "",
  initialAlt = "",
  onSuccess,
}: Props) {
  const [url, setUrl] = useState(initialUrl);
  const [alt, setAlt] = useState(initialAlt);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUrl(initialUrl);
    setAlt(initialAlt);
  }, [initialUrl, initialAlt]);

  const handleUpdate = async () => {
    if (!isValidUrl(url)) return;
    setError(null);
    try {
      setSaving(true);
      const updated = await UpdateProfileInput(username, token, {
        avatar: { url: url.trim(), alt: alt.trim() },
      });
      onSuccess(updated);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Avatar update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Stack spacing={2}>
        <TextField
          label="Avatar URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          fullWidth
          error={!!url && !isValidUrl(url)}
          helperText={
            url && !isValidUrl(url)
              ? "Enter a valid http(s) URL. The image must be publicly accessible."
              : "Paste a public image URL (http/https)."
          }
        />

        <TextField
          label="Alt text"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          fullWidth
          helperText="Describe the image for accessibility."
        />
      </Stack>
      <Stack alignSelf="center" sx={{ mt: 2 }}>
        <Button
          variant="elevated"
          color="pine"
          disabled={!isValidUrl(url) || saving}
          onClick={handleUpdate}
        >
          {saving ? "Updating…" : "Update"}
        </Button>
      </Stack>
    </Box>
  );
}
