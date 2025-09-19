import { loadAuth } from "../utils/authStorage";
import { useEffect, useState } from "react";
import { getProfile } from "../api/profile";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import {
  Alert,
  Avatar,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

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

  if (!auth) return <Navigate to="/auth/login" replace />;

  return (
    <Card>
      <CardContent>
        {loading ? (
          <Loader message="Loading your profile…" minHeight={320} />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Stack>
            <Avatar
              src={profile?.data.avatar?.url}
              alt={profile?.data.avatar?.alt || profile?.data.name}
              sx={{ width: 72, height: 72 }}
            />
            <Typography>{profile?.data.name}</Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
