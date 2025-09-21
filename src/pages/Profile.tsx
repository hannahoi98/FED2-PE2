import { loadAuth } from "../utils/authStorage";
import { useEffect, useState } from "react";
import { getProfile } from "../api/profile";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import type { Booking } from "../types/bookings";
import {
  Alert,
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import BookingCard from "../components/profile/BookingItem";
import { getProfileBookings } from "../api/bookings";

export default function Profile() {
  const auth = loadAuth();

  const name = auth?.name;
  const token = auth?.accessToken;
  const isManager = auth?.venueManager;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<Awaited<
    ReturnType<typeof getProfile>
  > | null>(null);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingsError, setBookingsError] = useState<string | null>(null);

  useEffect(() => {
    if (!name || !token) return;
    (async () => {
      try {
        setLoading(true);
        const p = await getProfile(name, token, {
          _venues: !!isManager,
          _bookings: true,
        });
        setProfile(p);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Failed to load profile");
      } finally {
        setLoading(false);
      }
    })();
  }, [name, token, isManager]);

  useEffect(() => {
    if (!name || !token) return;
    (async () => {
      try {
        setBookingsLoading(true);
        const res = await getProfileBookings(name, token, { _venue: true });
        setBookings(res.data);
      } catch (e: unknown) {
        setBookingsError(
          e instanceof Error ? e.message : "Failed to load bookings",
        );
      } finally {
        setBookingsLoading(false);
      }
    })();
  }, [name, token]);

  if (!auth) return <Navigate to="/auth/login" replace />;

  return (
    <Card>
      <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
        {loading ? (
          <Loader message="Loading your profile…" minHeight={320} />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Stack spacing={2}>
            <Stack spacing={1.5} alignItems="center" sx={{ pb: 4 }}>
              <Avatar
                variant="rounded"
                src={profile?.data.avatar?.url}
                alt={profile?.data.avatar?.alt || profile?.data.name}
                sx={{
                  width: 112,
                  height: 112,
                  borderRadius: 4,
                }}
              />
              <Typography variant="h4">{profile?.data.name}</Typography>
            </Stack>

            <Typography variant="h5" sx={{ alignSelf: "flex-start" }}>
              Your Bookings
            </Typography>
            <Divider />
            {bookingsLoading ? (
              <Loader minHeight={160} />
            ) : bookingsError ? (
              <Alert severity="error">{bookingsError}</Alert>
            ) : bookings.length === 0 ? (
              <Alert severity="info">You don’t have any bookings yet.</Alert>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                    md: "1fr 1fr 1fr",
                  },
                  gap: 2,
                }}
              >
                {bookings.map((b) => (
                  <Box key={b.id}>
                    <BookingCard booking={b} />
                  </Box>
                ))}
              </Box>
            )}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
