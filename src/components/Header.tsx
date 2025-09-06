import { AppBar, Typography, Toolbar, Box, Button } from "@mui/material";
import { COLORS } from "../theme";

export default function Header() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: COLORS.pine, color: COLORS.page }}
    >
      <Toolbar sx={{ gap: 2, px: 4, py: 4 }}>
        <Typography
          component="h1"
          variant="h3"
          sx={{
            fontFamily: '"Neonderthaw", cursive',
            mr: "auto",
            lineHeight: 1,
          }}
        >
          Holidaze
        </Typography>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button
            variant="text"
            color="inherit"
            component="a"
            href="#/venues"
            sx={{
              fontSize: "1.15rem",
              textTransform: "none",
              "&:hover": {
                color: COLORS.mint,
              },
            }}
          >
            Browse Venues
          </Button>
          <Button
            variant="text"
            color="inherit"
            component="a"
            href="#/venues"
            sx={{
              fontSize: "1.15rem",
              textTransform: "none",
              "&:hover": {
                color: COLORS.mint,
              },
            }}
          >
            Register
          </Button>
          <Button
            variant="text"
            color="inherit"
            component="a"
            href="#/venues"
            sx={{
              fontSize: "1.15rem",
              textTransform: "none",
              "&:hover": {
                color: COLORS.mint,
              },
            }}
          >
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
