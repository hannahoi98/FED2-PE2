import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AppBar, Typography, Toolbar, Box, Button } from "@mui/material";
import { loadAuth, onAuthChange, clearAuth } from "../../utils/authStorage";
import { COLORS, FONTS } from "../../theme";

const linkSx = {
  fontSize: "1.15rem",
  textTransform: "none",
  color: "inherit",
  borderBottom: "1px solid transparent",
  borderRadius: 0,
  "&:hover": { color: COLORS.mint },
  '&[aria-current="page"]': {
    color: COLORS.mint,
    borderBottom: `1px solid ${COLORS.mint}`,
  },
} as const;

/**
 * Top applicaton bar with logo and primary navigation
 */
export default function Header() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(loadAuth());

  useEffect(() => onAuthChange(() => setAuth(loadAuth())), []);

  const handleLogout = () => {
    clearAuth();
    navigate("/auth/login");
  };

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
          component={NavLink}
          to="/"
          end
          sx={{
            textDecoration: "none",
            color: "inherit",
            fontFamily: FONTS.logo,
            mr: "auto",
            lineHeight: 1,
            fontSize: { xs: "2.2rem", md: "3rem" },
          }}
        >
          Holidaze
        </Typography>

        <Box
          component="nav"
          sx={{ display: { xs: "none", md: "flex" }, gap: 1.5 }}
        >
          <Button component={NavLink} to="/" end sx={linkSx}>
            Browse Venues
          </Button>

          {!auth ? (
            <>
              <Button component={NavLink} to="/auth/register" sx={linkSx}>
                Register
              </Button>
              <Button component={NavLink} to="/auth/login" sx={linkSx}>
                Login
              </Button>
            </>
          ) : (
            <>
              <Button component={NavLink} to="/profile" sx={linkSx}>
                Profile
              </Button>
              <Button onClick={handleLogout} sx={linkSx}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
