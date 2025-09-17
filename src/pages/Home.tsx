import { Box, Divider, Stack, Typography } from "@mui/material";
import { COLORS } from "../theme";
import AllVenuesGrid from "../components/AllVenuesGrid";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import dayjs, { Dayjs } from "dayjs";
import LabeledDatePicker from "../components/ui/LabeledDatePicker";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [activeQuery, setActiveQuery] = useState("");

  const [from, setFrom] = useState<Dayjs | null>(null);
  const [to, setTo] = useState<Dayjs | null>(null);

  const today = dayjs().startOf("day");

  return (
    <Stack spacing={0.5}>
      <Box sx={{ display: "grid", placeItems: "center", pb: 10 }}>
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
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Typography component="h2" variant="h4">
          All Venues
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            gap: 1,
          }}
        >
          <LabeledDatePicker
            label="From"
            value={from}
            onChange={(v) => {
              setFrom(v);
              if (v && to && to.isBefore(v, "day")) setTo(null);
            }}
            minDate={today}
          />

          <LabeledDatePicker
            label="To"
            value={to}
            onChange={(v) => setTo(v)}
            minDate={from ?? today}
            shouldDisableDate={(d) =>
              !!from && (d.isSame(from, "day") || d.isBefore(from, "day"))
            }
          />

          <SearchBar
            value={searchText}
            onChange={setSearchText}
            onActiveQueryChange={setActiveQuery}
            width={320}
            delay={350}
            minLength={3}
          />
        </Box>
      </Box>
      <Divider
        sx={{
          opacity: 1,
          borderBottomWidth: 2,
          width: "100%",
        }}
      />
      <AllVenuesGrid query={activeQuery} from={from} to={to} />
    </Stack>
  );
}
