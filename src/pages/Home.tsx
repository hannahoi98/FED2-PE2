import { Box, Divider, Stack, Typography } from "@mui/material";
import { COLORS } from "../theme";
import AllVenuesGrid from "../components/AllVenuesGrid";
import { useState } from "react";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [activeQuery, setActiveQuery] = useState("");

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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Typography component="h2" variant="h4">
          All Venues
        </Typography>
        <SearchBar
          value={searchText}
          onChange={setSearchText}
          onActiveQueryChange={setActiveQuery}
          width={320}
          delay={350}
          minLength={3}
        />
      </Box>
      <Divider
        sx={{
          opacity: 1,
          borderBottomWidth: 2,
          width: "100%",
        }}
      />
      <AllVenuesGrid query={activeQuery} />
    </Stack>
  );
}
