import { AppBar, Typography, Toolbar, Box, Button } from "@mui/material";
import { COLORS } from "../theme";
import { FONTS } from "../theme";

export default function Header() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: COLORS.pine, color: COLORS.page }}
    >
      <Toolbar
        sx={{
          gap: 2,
          px: { xs: 2, md: 4 },
          py: { xs: 2, md: 4 },
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontFamily: FONTS.logo,
            mr: "auto",
            lineHeight: 1,
            fontSize: { xs: "2.2rem", md: "3rem" },
          }}
        >
          Holidaze
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1.5 }}>
          <Button
            variant="text"
            color="inherit"
            component="a"
            href="/"
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
            href="/auth/register"
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
            href="/auth/login"
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
