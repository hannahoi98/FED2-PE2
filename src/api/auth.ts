import {
  REGISTER_URL,
  buildHeaders,
  LOGIN_URL_WITH_HOLIDAZE,
} from "./endpoints";

import type {
  RegistrationData,
  RegisterSuccess,
  ApiErrorResponse,
  LoginCredentials,
  LoginSuccess,
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

export async function loginUser(
  credentials: LoginCredentials,
  opts: { holidaze?: boolean } = { holidaze: true },
): Promise<LoginSuccess> {
  const url = LOGIN_URL_WITH_HOLIDAZE(opts.holidaze ?? true);

  const res = await fetch(url, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(credentials),
  });

  const json = await res.json();
  if (!res.ok) {
    const err = json as ApiErrorResponse;
    const msg =
      err.errors?.[0]?.message || err.message || `Login failed (${res.status})`;
    throw new Error(msg);
  }
  return json as LoginSuccess;
}
