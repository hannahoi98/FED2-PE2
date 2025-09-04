import { Box, Typography } from "@mui/material";
import { COLORS } from "../theme";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: COLORS.pine,
        color: COLORS.page,
        py: 3,
        mt: "auto",
      }}
    >
      <Typography sx={{ fontFamily: '"DM Serif Display", serif' }}>
        Placeholder footer
      </Typography>
    </Box>
  );
}
