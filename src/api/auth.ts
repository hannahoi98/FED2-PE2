import { REGISTER_URL, buildHeaders } from "./endpoints";

import type {
  RegistrationData,
  RegisterSuccess,
  ApiErrorResponse,
} from "../types/auth";

export async function registerUser(
  registration: RegistrationData,
): Promise<RegisterSuccess> {
  const res = await fetch(REGISTER_URL, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(registration),
  });

  const json = await res.json();
  if (!res.ok) {
    const err = json as ApiErrorResponse;
    const msg =
      err.errors?.[0]?.message ||
      err.message ||
      `Registration failed (${res.status})`;
    throw new Error(msg);
  }
  return json as RegisterSuccess;
}
