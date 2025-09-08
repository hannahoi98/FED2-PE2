import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { TravelExploreOutlined } from "@mui/icons-material";
import { PersonAddOutlined } from "@mui/icons-material";
import { PersonOutline } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const ITEMS = [
  { label: "Browse", to: "/", icon: <TravelExploreOutlined /> },
  { label: "Register", to: "/auth/register", icon: <PersonAddOutlined /> },
  { label: "Login", to: "/auth/login", icon: <PersonOutline /> },
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
