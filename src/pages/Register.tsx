import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import RegisterForm from "../components/auth/RegisterForm";
import { COLORS, FONTS } from "../theme";

/**
 * Register page wrapper.
 * Shows a heading and the Register Form inside a card.
 *
 * @returns Register page
 */
export default function Register() {
  const navigate = useNavigate();
  const from = (useLocation().state as { from?: string } | null)?.from;

  return (
    <Stack
      spacing={2.5}
      sx={{
        maxWidth: { xs: 600, md: 760 },
        mx: "auto",
        px: { xs: 2, sm: 3 },
      }}
    >
      <Card
        sx={{
          maxWidth: { xs: "100%", sm: 560, md: 600 },
          mx: "auto",
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4, md: 6 } }}>
          <Typography component="h1" variant="h4" align="center" sx={{ mb: 1 }}>
            Register your account
          </Typography>
          <Divider sx={{ opacity: 1, mb: 4 }} />
          <RegisterForm
            onSuccess={(email) => {
              navigate("/auth/login", { state: { prefillEmail: email, from } });
            }}
          />
          <Box sx={{ textAlign: "center", mt: { xs: 3, sm: 4, md: 5 } }}>
            <Typography sx={{ fontFamily: FONTS.sans }}>
              {" "}
              Already have an account?{" "}
            </Typography>
            <Link
              component={RouterLink}
              to="/auth/login"
              underline="hover"
              sx={{
                color: COLORS.pine,
                fontWeight: 800,
                fontFamily: FONTS.sans,
              }}
            >
              Login Here
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
}
