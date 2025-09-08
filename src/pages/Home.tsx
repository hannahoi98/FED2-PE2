import { Box, Divider, Stack, Typography } from "@mui/material";
import { COLORS } from "../theme";
import AllVenuesGrid from "../components/AllVenuesGrid";

export default function Home() {
  return (
    <Stack spacing={1}>
      <Box sx={{ display: "grid", placeItems: "center" }}>
        <Typography
          variant="h5"
          maxWidth="280px"
          textAlign="center"
          sx={{
            color: COLORS.pop,
          }}
        >
          Welcome to Holidaze - Your best choice to host or book unforgettable
          stays.
        </Typography>
      </Box>

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
      <AllVenuesGrid />
    </Stack>
  );
}
