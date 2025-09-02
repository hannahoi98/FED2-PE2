import { createTheme } from "@mui/material/styles";

// Colors
export const COLORS = {
  pine: "#093F3B",
  mint: "#C8DEDC",
  pop: "#B65454",
  page: "#FBF9F6",
  white: "#FFFFFF",
};

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    elevated: true;
  }
  interface ButtonPropsColorOverrides {
    mint: true;
    pine: true;
    white: true;
  }
}

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: COLORS.pine, contrastText: COLORS.page },
    secondary: { main: COLORS.mint, contrastText: COLORS.pine },
    background: {
      default: COLORS.page,
      paper: COLORS.white,
    },
    text: {
      primary: COLORS.pine,
    },
    divider: COLORS.mint,
  },
  typography: {
    fontFamily: ['"DM Sans"', "system-ui", "Arial", "sans-serif"].join(","),
    h1: { fontFamily: '"DM Serif Display", serif' },
    h2: { fontFamily: '"DM Serif Display", serif' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: COLORS.page,
          color: COLORS.pine,
        },
        a: { color: COLORS.pine },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 10,
        },
      },
      variants: [
        {
          props: { variant: "elevated", color: "mint" },
          style: {
            backgroundColor: COLORS.mint,
            color: COLORS.pine,
          },
        },
        {
          props: { variant: "elevated", color: "pine" },
          style: {
            backgroundColor: COLORS.pine,
            color: COLORS.page,
          },
        },
        {
          props: { variant: "elevated", color: "white" },
          style: {
            backgroundColor: COLORS.white,
            color: COLORS.pine,
            border: `1px solid ${COLORS.mint}`,
          },
        },
      ],
    },
  },
});

export default theme;
