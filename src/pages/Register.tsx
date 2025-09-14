import { Stack, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";

export default function Register() {
  const navigate = useNavigate();
  const from = (useLocation().state as { from?: string } | null)?.from;

  return (
    <Stack>
      <Typography component="h1" variant="h4">
        Register your account
      </Typography>
      <RegisterForm
        onSuccess={(email) => {
          navigate("/auth/login", { state: { prefillEmail: email, from } });
        }}
      />
    </Stack>
  );
}
