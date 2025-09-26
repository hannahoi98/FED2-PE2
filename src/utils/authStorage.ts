import type { AuthUser, LoginSuccess } from "../types/auth";

const KEY = "auth";

/**
 * Subscribe to auth changes (login/logout).
 * @returns Unsubscribe function
 */
export const authEvents = new EventTarget();
const AUTH_CHANGED = "auth-changed";
export function onAuthChange(cb: () => void) {
  const handler = () => cb();
  authEvents.addEventListener(AUTH_CHANGED, handler);
  return () => authEvents.removeEventListener(AUTH_CHANGED, handler);
}

/**
 * Save the login data to localStorage and notify listeners.
 * @param login API response from the login call
 * @returns A simplified `AuthUser` object
 */
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

/**
 * Load the saved auth info.
 * @returns The user or null if not logged in
 */
export function loadAuth(): AuthUser | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

/**
 * Clear auth info and notify listeners.
 */
export function clearAuth() {
  localStorage.removeItem(KEY);
  authEvents.dispatchEvent(new Event(AUTH_CHANGED));
}
