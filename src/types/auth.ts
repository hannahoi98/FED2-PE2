// Types we send to auth/register

/** Body for POST /auth/register. */
export type RegistrationData = {
  name: string;
  email: string;
  password: string;
  venueManager: boolean;
};

// Types we get back from auth/register

/** Success data from /auth/register. */
export type RegisterSuccess = {
  data: {
    name: string;
    email: string;
    venueManager: boolean;
  };
};

/** Common API error shapes. */
export type ApiErrorItem = { message: string };
export type ApiErrorResponse = { message?: string; errors?: ApiErrorItem[] };

/** Body for POST /auth/login. */
export type LoginCredentials = {
  email: string;
  password: string;
};

/** Success data rom /auth/login. */
export type LoginSuccess = {
  data: {
    name: string;
    email: string;
    avatar?: { url?: string; alt?: string } | null;
    accessToken: string;
    venueManager: boolean;
  };
  meta: Record<string, unknown>;
};

/** What we keep in localStorage after login. */
export type AuthUser = {
  name: string;
  email: string;
  accessToken: string;
  venueManager: boolean;
  avatarUrl?: string;
};

/** Body for updating parts of the profile (only avatar for now). */
export type UpdateProfileInput = {
  avatar?: { url: string; alt?: string };
};
