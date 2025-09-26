import { createTheme, alpha } from "@mui/material/styles";

/** Shared font families */
export const FONTS = {
  serif: '"DM Serif Display", serif',
  sans: '"DM Sans", system-ui, Arial, sans-serif',
  logo: '"Neonderthaw", cursive',
};

/** Brand colors */
export const COLORS = {
  pine: "#093F3B",
  mint: "#C8DEDC",
  pop: "#B65454",
  page: "#FBF9F6",
  white: "#FFFFFF",
};

// ——— MUI Module Augmentation ———
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
    info: { main: COLORS.mint, contrastText: COLORS.pine },
    background: {
      default: COLORS.page,
      paper: COLORS.white,
    },
    error: { main: COLORS.pop },
    text: {
      primary: COLORS.pine,
    },
    divider: COLORS.mint,
  },
  typography: {
    fontFamily: FONTS.serif,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: COLORS.page,
          color: COLORS.pine,
          fontFamily: FONTS.serif,
        },
        a: { color: COLORS.pine },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: COLORS.pine,
          "&.Mui-checked": { color: COLORS.pine },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
        slotProps: {
          inputLabel: { shrink: true },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 19,
          color: COLORS.pine,
          backgroundColor: COLORS.mint,
          padding: "0 6px",
          borderRadius: 5,
          "&.Mui-error": { color: COLORS.pine },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontFamily: '"DM Sans", system-ui, Arial, sans-serif',
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.white,
          "& fieldset": { borderColor: COLORS.pine },
          "&:hover fieldset": { borderColor: COLORS.pine },
          "&.Mui-focused fieldset": {
            borderColor: COLORS.pine,
            borderWidth: 2,
          },
        },
        input: {
          "&::placeholder": { opacity: 1, color: "rgba(9, 63, 59, 0.6)" },
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          fontFamily: '"DM Sans", system-ui, Arial, sans-serif',
          color: COLORS.pine,
        },
      },
    },

    MuiAlert: {
      defaultProps: { variant: "standard" },
      styleOverrides: {
        root: { borderRadius: 12, alignItems: "center" },
        icon: { marginRight: 8 },
      },
      variants: [
        {
          props: { variant: "standard", severity: "info" },
          style: {
            backgroundColor: alpha(COLORS.mint, 0.12),
            color: COLORS.pine,
            border: `1px solid ${alpha(COLORS.mint, 0.45)}`,
          },
        },
        {
          props: { variant: "standard", severity: "error" },
          style: {
            backgroundColor: alpha(COLORS.pop, 0.1),
            color: COLORS.pop,
            border: `1px solid ${alpha(COLORS.pop, 0.55)}`,
          },
        },
      ],
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 10,
          fontFamily: FONTS.serif,
        },
      },

      variants: [
        {
          props: { variant: "elevated", color: "mint" },
          style: {
            backgroundColor: COLORS.mint,
            color: COLORS.pine,
            fontFamily: FONTS.sans,
            boxShadow: "0 4px 10px rgba(142,197,190,.25)",
            "&:hover": {
              backgroundColor: "#B6D5D2",
              boxShadow: "0 6px 18px rgba(142,197,190,.35)",
            },
            "&.Mui-focusVisible": {
              boxShadow: `0 0 0 3px ${alpha(COLORS.mint, 0.45)}`,
            },
          },
        },
        {
          props: { variant: "elevated", color: "pine" },
          style: {
            backgroundColor: COLORS.pine,
            color: COLORS.page,
            fontFamily: FONTS.sans,
            boxShadow: "0 4px 10px rgba(9,63,59,.25)",
            "&:hover": {
              backgroundColor: "#073630",
              boxShadow: "0 6px 18px rgba(9,63,59,.35)",
            },
            "&.Mui-focusVisible": {
              boxShadow: `0 0 0 3px ${alpha(COLORS.pine, 0.35)}`,
            },
            "&.Mui-disabled": {
              color: COLORS.page,
              opacity: 0.9,
            },
          },
        },
        {
          props: { variant: "elevated", color: "white" },
          style: {
            backgroundColor: COLORS.white,
            color: COLORS.pine,
            fontFamily: FONTS.sans,
            border: `1px solid ${COLORS.pine}`,
            boxShadow: "0 4px 10px rgba(0,0,0,.08)",
            "&:hover": {
              backgroundColor: "#F7FAF9",
              boxShadow: "0 6px 18px rgba(0,0,0,.12)",
            },
            "&.Mui-focusVisible": {
              boxShadow: `0 0 0 3px ${alpha(COLORS.mint, 0.45)}`,
            },
          },
        },
      ],
    },
  },
});

export default theme;
