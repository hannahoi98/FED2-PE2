import type { AuthUser, LoginSuccess } from "../types/auth";

const KEY = "auth";

export const authEvents = new EventTarget();
const AUTH_CHANGED = "auth-changed";
export function onAuthChange(cb: () => void) {
  const handler = () => cb();
  authEvents.addEventListener(AUTH_CHANGED, handler);
  return () => authEvents.removeEventListener(AUTH_CHANGED, handler);
}

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
  authEvents.dispatchEvent(new Event(AUTH_CHANGED));
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
  authEvents.dispatchEvent(new Event(AUTH_CHANGED));
}
