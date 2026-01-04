import { createTheme, Theme } from "@mui/material/styles";

// Custom color definitions
export const MAGENTA = "#E3007E";
export const BLUE_GREEN = "#00B3B3";
export const GOLD = "#FFD700";
export const LIGHT_MAGENTA = "#f062a7";

// Light theme configuration
export const lightTheme: Theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: MAGENTA,
      light: LIGHT_MAGENTA,
      dark: "#c1006a",
    },
    secondary: {
      main: BLUE_GREEN,
      light: "#33c4c4",
      dark: "#008f8f",
    },
    background: {
      default: "#ffffff",
      paper: "#f9f9f9",
    },
    text: {
      primary: "#333333",
      secondary: "#555555",
    },
  },
  typography: {
    fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
        },
      },
    },
  },
});

// Dark theme configuration
export const darkTheme: Theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: MAGENTA,
      light: LIGHT_MAGENTA,
      dark: "#c1006a",
    },
    secondary: {
      main: BLUE_GREEN,
      light: "#33c4c4",
      dark: "#008f8f",
    },
    background: {
      default: "#0a0a0a",
      paper: "#1a1a1a",
    },
    text: {
      primary: "#ededed",
      secondary: "#b0b0b0",
    },
  },
  typography: {
    fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1a1a1a",
          borderRadius: "8px",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1a1a1a",
        },
      },
    },
  },
});
