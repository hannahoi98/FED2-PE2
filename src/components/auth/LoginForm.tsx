import { useState } from "react";
import { saveAuth } from "../../utils/authStorage";
import { validateEmail, validatePassword } from "../../utils/validation";
import { loginUser } from "../../api/auth";
import type { AuthUser } from "../../types/auth";
import { FONTS } from "../../theme";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";

type Props = {
  prefillEmail?: string;
  onSuccess?: (user: AuthUser) => void;
};

type FormState = {
  email: string;
  password: string;
  remember: boolean;
};

export default function LoginForm({ prefillEmail, onSuccess }: Props) {
  const [form, setForm] = useState<FormState>({
    email: prefillEmail ?? "",
    password: "",
    remember: true,
  });

  const [errors, setErrors] = useState<Record<keyof FormState, string>>({
    email: "",
    password: "",
    remember: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const setField = (key: keyof FormState) => (value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }) as FormState);

  const validateAll = () => {
    const next = {
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      remember: "",
    };
    setErrors(next);
    return Object.values(next).every((m) => !m);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    if (!validateAll()) return;

    try {
      setSubmitting(true);
      const result = await loginUser({
        email: form.email.trim(),
        password: form.password,
      });

      const user = saveAuth(result);
      onSuccess?.(user);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setServerError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={3} sx={{ fontFamily: FONTS.sans }}>
        {serverError && <Alert severity="error">{serverError}</Alert>}

        <TextField
          label="Email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setField("email")(e.target.value)}
          onBlur={() =>
            setErrors((e) => ({ ...e, email: validateEmail(form.email) }))
          }
          error={Boolean(errors.email)}
          helperText={errors.email || "Use a stud.noroff.no email"}
          autoComplete="email"
          required
          fullWidth
        />

        <TextField
          label="Password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setField("password")(e.target.value)}
          onBlur={() =>
            setErrors((e) => ({
              ...e,
              password: validatePassword(form.password),
            }))
          }
          error={Boolean(errors.password)}
          helperText={
            errors.password || "At least 8 chars with a letter and a number"
          }
          autoComplete="current-password"
          required
          fullWidth
        />

        <Button
          type="submit"
          variant="elevated"
          color="mint"
          disabled={submitting}
          sx={{ alignSelf: "center" }}
        >
          {submitting ? "Logging in…" : "Log in"}
        </Button>
      </Stack>
    </Box>
  );
}
