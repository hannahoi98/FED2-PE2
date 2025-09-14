import {
  Box,
  Card,
  CardContent,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";
import { COLORS } from "../theme";

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
        <CardContent>
          <Typography component="h1" variant="h4" align="center" sx={{ mb: 1 }}>
            Register your account
          </Typography>
          <Divider sx={{ borderColor: COLORS.mint, opacity: 1, mb: 3 }} />
          <RegisterForm
            onSuccess={(email) => {
              navigate("/auth/login", { state: { prefillEmail: email, from } });
            }}
          />
          <Box sx={{ textAlign: "center" }}>
            <Typography> Already have an account? </Typography>
            <Link
              component={RouterLink}
              to="/auth/login"
              underline="hover"
              sx={{ color: COLORS.pine, fontWeight: 600 }}
            >
              Login Here
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
}
