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
