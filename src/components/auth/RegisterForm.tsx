import {
  validateUsername,
  validateEmail,
  validatePassword,
} from "../../utils/validation";
import { registerUser } from "../../api/auth";
import type { RegistrationData } from "../../types/auth";
import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Stack,
  TextField,
  Radio,
  RadioGroup,
} from "@mui/material";

type FormState = {
  name: string;
  email: string;
  password: string;
  role: "customer" | "manager";
};

export default function RegisterForm({
  onSuccess,
}: {
  onSuccess?: (email: string) => void;
}) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [errors, setErrors] = useState<Record<keyof FormState, string>>({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);

  const setField = (key: keyof FormState) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validateAll = () => {
    const next = {
      name: validateUsername(form.name),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      role: form.role ? "" : "Choose a role",
    };
    setErrors(next);
    return Object.values(next).every((m) => !m);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    setServerSuccess(null);

    if (!validateAll()) return;

    try {
      setSubmitting(true);

      const registration = {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        venueManager: form.role === "manager",
      } satisfies RegistrationData;

      await registerUser(registration);

      setServerSuccess("Account created! You can now log in.");
      onSuccess?.(registration.email);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setServerError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack>
        {serverError && <Alert severity="error">{serverError}</Alert>}
        {serverSuccess && <Alert severity="success">{serverSuccess}</Alert>}

        <TextField
          label="Username"
          value={form.name}
          onChange={(e) => setField("name")(e.target.value)}
          onBlur={() =>
            setErrors((e) => ({ ...e, name: validateUsername(form.name) }))
          }
          error={Boolean(errors.name)}
          helperText={
            errors.name || "3 to 20 characters, letters, numbers and _ accepted"
          }
          autoComplete="username"
          required
          fullWidth
        />

        <TextField
          label="Email (stud.noroff.no)"
          value={form.email}
          onChange={(e) => setField("email")(e.target.value)}
          onBlur={() =>
            setErrors((e) => ({ ...e, email: validateEmail(form.email) }))
          }
          error={Boolean(errors.email)}
          helperText={errors.email || "Use your stud.noroff.no email"}
          autoComplete="email"
          required
          fullWidth
        />

        <TextField
          label="Password"
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
            errors.password || "Min 8 chars, include a letter + a number"
          }
          autoComplete="new-password"
          required
          fullWidth
        />
        <FormControl required>
          <FormLabel id="role-label">Sign Up As:</FormLabel>
          <RadioGroup
            row
            aria-labelledby="role-label"
            name="role"
            value={form.role}
            onChange={(e) => setField("role")(e.target.value)}
          >
            <FormControlLabel
              value="customer"
              control={<Radio />}
              label="Customer"
            />
            <FormControlLabel
              value="manager"
              control={<Radio />}
              label="Venue manager"
            />
          </RadioGroup>
        </FormControl>
        <Button
          type="submit"
          variant="elevated"
          color="mint"
          disabled={submitting}
        >
          {submitting ? "Creating account…" : "Create account"}
        </Button>
      </Stack>
    </Box>
  );
}
