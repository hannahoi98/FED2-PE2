import type { AuthUser, LoginSuccess } from "../types/auth";

const KEY = "auth";

export function saveAuth(login: LoginSuccess) {
  const d = login.data;
  const auth: AuthUser = {
    name: d.name,
    email: d.email,
    accessToken: d.accessToken,
    venueManager: d.venueManager,
    avatarUrl: d.avatar?.url ?? undefined,
  };
  localStorage.setItem(KEY, JSON.stringify(auth));
  return auth;
}

export function loadAuth(): AuthUser | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function clearAuth() {
  localStorage.removeItem(KEY);
}
