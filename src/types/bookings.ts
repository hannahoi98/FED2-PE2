export type CreateBookingInput = {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
};

export type CreateBookingSuccess = {
  data: {
    id: string;
    dateFrom: string;
    dateTo: string;
    guests: number;
    created: string;
    updated: string;
    venueId?: string;
  };
  meta: Record<string, unknown>;
};
