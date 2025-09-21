// Types we send to auth/register
export type RegistrationData = {
  name: string;
  email: string;
  password: string;
  venueManager: boolean;
};

// Types we get back from auth/register
export type RegisterSuccess = {
  data: {
    name: string;
    email: string;
    venueManager: boolean;
  };
};

export type ApiErrorItem = { message: string };
export type ApiErrorResponse = { message?: string; errors?: ApiErrorItem[] };

export type LoginCredentials = {
  email: string;
  password: string;
};

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

export type AuthUser = {
  name: string;
  email: string;
  accessToken: string;
  venueManager: boolean;
  avatarUrl?: string;
};

export type UpdateProfile = {
  avatar?: { url: string; alt?: string };
};
