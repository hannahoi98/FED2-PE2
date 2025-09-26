import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import {
  TravelExploreSharp,
  PersonAddSharp,
  PersonSharp,
  Logout,
} from "@mui/icons-material";
import { loadAuth, clearAuth, onAuthChange } from "../../utils/authStorage";
import { COLORS } from "../../theme";

/**
 * Mobile bottom navigation for primary app routes and authentication actions.
 *
 * Displays on `xs–sm` viewports; hidden on `md+` where the header handles navigation
 */
export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [auth, setAuth] = useState(loadAuth());

  useEffect(() => onAuthChange(() => setAuth(loadAuth())), []);

  const ITEMS = useMemo(
    () =>
      !auth
        ? [
            { label: "Browse", to: "/", icon: <TravelExploreSharp /> },
            {
              label: "Register",
              to: "/auth/register",
              icon: <PersonAddSharp />,
            },
            { label: "Login", to: "/auth/login", icon: <PersonSharp /> },
          ]
        : [
            { label: "Browse", to: "/", icon: <TravelExploreSharp /> },
            { label: "Profile", to: "/profile", icon: <PersonSharp /> },
            { label: "Logout", to: "__logout__", icon: <Logout /> },
          ],
    [auth],
  );

  const path = location.pathname;
  const value = (() => {
    if (path === "/") {
      return ITEMS.findIndex((it) => it.to === "/");
    }
    const idx = ITEMS.findIndex(
      (it) => it.to !== "/" && it.to !== "__logout__" && path.startsWith(it.to),
    );
    return idx === -1 ? 0 : idx;
  })();

  const handleChange = (_: unknown, newIdx: number) => {
    const it = ITEMS[newIdx];
    if (it.to === "__logout__") {
      clearAuth();
      navigate("/auth/login");
    } else {
      navigate(it.to);
    }
  };

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
        onChange={handleChange}
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
