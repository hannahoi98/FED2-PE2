import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { TravelExploreSharp } from "@mui/icons-material";
import { PersonAddSharp } from "@mui/icons-material";
import { PersonSharp } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { COLORS } from "../theme";

const ITEMS = [
  { label: "Browse", to: "/", icon: <TravelExploreSharp /> },
  { label: "Register", to: "/auth/register", icon: <PersonAddSharp /> },
  { label: "Login", to: "/auth/login", icon: <PersonSharp /> },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const value = (() => {
    const idx = ITEMS.findIndex((it) => location.pathname.startsWith(it.to));
    return idx === -1 ? 0 : idx;
  })();

  return (
    <Box
      sx={{
        display: { xs: "block", md: "none" },
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: (t) => t.zIndex.appBar,
      }}
    >
      <BottomNavigation
        value={value}
        onChange={(_, newVal) => navigate(ITEMS[newVal].to)}
        showLabels
        sx={{
          bgcolor: COLORS.pine,
          color: COLORS.page,
          pb: "env(safe-area-inset-bottom)",
          "& .MuiBottomNavigationAction-root": {
            color: COLORS.page,
            fontFamily: '"DM Serif Display", serif',
            "&.Mui-selected": { color: COLORS.mint },
          },
        }}
      >
        {ITEMS.map((it) => (
          <BottomNavigationAction
            key={it.to}
            label={it.label}
            icon={it.icon}
            aria-label={it.label}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
}
