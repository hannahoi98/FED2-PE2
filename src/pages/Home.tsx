import { Divider, Stack, Typography } from "@mui/material";
import { COLORS } from "../theme";

export default function Home() {
  return (
    <Stack spacing={1}>
      <Typography
        variant="h5"
        align="center"
        maxWidth="280px"
        sx={{
          color: COLORS.pop,
        }}
      >
        Welcome to Holidaze - Your best choice to host or book unforgettable
        stays.
      </Typography>

      <Typography component="h2" variant="h4">
        All Venues
      </Typography>
      <Divider
        sx={{
          opacity: 1,
          borderBottomWidth: 2,
          width: "100%",
        }}
      />
    </Stack>
  );
}
