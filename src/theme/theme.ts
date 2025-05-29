import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    primary: {
      main: '#7246DC', // Brand purple
    },
    secondary: {
      main: '#F388BF', // Brand pink
    },
    background: {
      default: mode === 'dark' ? '#181A20' : '#F7F8FA', // Subtle light gray
      paper: mode === 'dark' ? '#23262F' : '#FFFFFF',
    },
    text: {
      primary: mode === 'dark' ? '#fff' : '#222',
      secondary: mode === 'dark' ? '#B0B3C6' : '#666',
    },
  },
  typography: {
    fontFamily: '"Outfit", Inter, Arial, sans-serif',
    h1: { fontWeight: 700, fontSize: '2.5rem', letterSpacing: 0.5 },
    h2: { fontWeight: 700, fontSize: '2rem', letterSpacing: 0.5 },
    h3: { fontWeight: 600, fontSize: '1.5rem', letterSpacing: 0.2 },
    h4: { fontWeight: 600, fontSize: '1.25rem', letterSpacing: 0.1 },
    h5: { fontWeight: 500, fontSize: '1.1rem' },
    h6: { fontWeight: 500, fontSize: '1rem' },
    body1: { fontWeight: 400, fontSize: '1rem', letterSpacing: 0.2 },
    body2: { fontWeight: 400, fontSize: '0.95rem', letterSpacing: 0.2 },
    button: { fontWeight: 500, fontSize: '1rem', textTransform: 'none', letterSpacing: 0.3 },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow: '0 2px 12px 0 rgba(114,70,220,0.06)',
          border: '1px solid #ECECEC',
          background: mode === 'dark' ? '#23262F' : '#fff',
          transition: 'all 0.2s ease-in-out',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 500,
          letterSpacing: 0.3,
        },
      },
    },
  },
}); 