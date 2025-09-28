import { Box, CircularProgress, Stack, Typography } from "@mui/material";

type LoaderProps = {
  /** Optional message under the spinner. */
  message?: string;
  /** Minimum height for the wrapper. */
  minHeight?: number | string;
};

/**
 * Centered progress spinner with optional label
 */
export default function Loader({ message, minHeight = 200 }: LoaderProps) {
  return (
    <Box
      role="status"
      aria-busy="true"
      sx={{ display: "grid", placeItems: "center", py: 6, minHeight }}
    >
      <Stack alignItems="center">
        <CircularProgress aria-label={message ?? "Loading"} />
        {message && <Typography>{message}</Typography>}
      </Stack>
    </Box>
  );
}
