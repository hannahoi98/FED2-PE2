import { Box, CircularProgress, Stack, Typography } from "@mui/material";

type LoaderProps = {
  message?: string;
  minHeight?: number | string;
};

export default function Loader({ message, minHeight = 200 }: LoaderProps) {
  return (
    <Box
      role="status"
      aria-busy="true"
      sx={{ display: "grid", placeItems: "center", py: 6, minHeight }}
    >
      <Stack alignItems="center">
        <CircularProgress />
        {message && <Typography>{message}</Typography>}
      </Stack>
    </Box>
  );
}
