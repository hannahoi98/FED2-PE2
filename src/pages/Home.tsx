import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Box, Divider, Stack, Typography } from "@mui/material";
import AllVenuesGrid from "../components/venue/browse/AllVenuesGrid";
import SearchBar from "../components/ui/SearchBar";
import LabeledDatePicker from "../components/ui/LabeledDatePicker";
import { COLORS } from "../theme";

/**
 * The home (browsing) page
 *
 */
export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [from, setFrom] = useState<Dayjs | null>(null);
  const [to, setTo] = useState<Dayjs | null>(null);

  const today = dayjs().startOf("day");

  return (
    <Stack spacing={2}>
      <Box sx={{ display: "grid", placeItems: "center", pb: 10 }}>
        <Typography
          maxWidth="350px"
          textAlign="center"
          sx={{
            color: COLORS.pop,
            fontSize: 26,
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
          alignItems: "flex-end",
          width: "100%",
          gap: 1,
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            width: { xs: "100%", md: "auto" },
            textAlign: { xs: "center", md: "left" },
            mb: { xs: 1.5, md: 0 },
          }}
        >
          All Venues
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            flex: "1 1 auto",
            justifyContent: { xs: "space-between", md: "flex-end" },
            ml: { lg: "auto" },
            gap: 1,
          }}
        >
          <Box
            sx={{
              flex: { xs: "0 0 calc(50% - 8px)", md: "0 0 auto" },
              minWidth: { md: 120 },
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
              slotProps={{
                textField: { size: "small", sx: { width: "100%" } },
              }}
            />
          </Box>
          <Box
            sx={{
              flex: { xs: "0 0 calc(50% - 8px)", md: "0 0 auto" },
              minWidth: { md: 120 },
            }}
          >
            <LabeledDatePicker
              label="To"
              value={to}
              onChange={(v) => setTo(v)}
              minDate={from ?? today}
              slotProps={{
                textField: { size: "small", sx: { width: "100%" } },
              }}
              shouldDisableDate={(d) =>
                !!from && (d.isSame(from, "day") || d.isBefore(from, "day"))
              }
            />
          </Box>
          <Box
            sx={{ flex: { xs: "1 1 100%", md: "0 0 200px", lg: "0 0 340px" } }}
          >
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
