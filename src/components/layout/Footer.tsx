import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { COLORS } from "../../theme";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: COLORS.pine,
        color: COLORS.page,
        mt: 6,
      }}
    >
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Stack spacing={1.25} alignItems="center">
          <Typography sx={{ textAlign: "center", fontSize: 18 }}>
            Follow us for the latest news from Holidaze
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton
              aria-label="Visit our Instagram"
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "inherit",
                "&:hover": { color: COLORS.mint },
              }}
            >
              <InstagramIcon />
            </IconButton>

            <IconButton
              aria-label="Visit our Facebook"
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "inherit",
                "&:hover": { color: COLORS.mint },
              }}
            >
              <FacebookIcon />
            </IconButton>

            <IconButton
              aria-label="Visit our YouTube"
              href="https://youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "inherit",
                "&:hover": { color: COLORS.mint },
              }}
            >
              <YouTubeIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
