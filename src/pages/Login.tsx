import {
  Stack,
  Typography,
  Card,
  CardContent,
  Divider,
  Box,
  Link,
} from "@mui/material";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { COLORS, FONTS } from "../theme";

export default function Login() {
  const navigate = useNavigate();
  const loc = useLocation() as {
    state?: { prefillEmail?: string; from?: string };
  };

  const prefillEmail = loc.state?.prefillEmail;
  const from = loc.state?.from;

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
            Login To your account
          </Typography>
          <Divider sx={{ opacity: 1, mb: 4 }} />
          <LoginForm
            prefillEmail={prefillEmail}
            onSuccess={() => {
              navigate(from || "/", { replace: true });
            }}
          />
          <Box sx={{ textAlign: "center", mt: { xs: 3, sm: 4, md: 5 } }}>
            <Typography sx={{ fontFamily: FONTS.sans }}>
              {" "}
              Don´t have an account yet?{" "}
            </Typography>
            <Link
              component={RouterLink}
              to="/auth/register"
              underline="hover"
              sx={{
                color: COLORS.pine,
                fontWeight: 800,
                fontFamily: FONTS.sans,
              }}
            >
              Register Here
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
}
