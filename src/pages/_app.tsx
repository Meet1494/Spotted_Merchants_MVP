import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from '@/theme/theme';
import { ThemeModeProvider, useThemeMode } from '@/theme/ThemeModeContext';

function AppThemeWrapper({ Component, pageProps }: AppProps) {
  const { mode } = useThemeMode();
  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default function App(props: AppProps) {
  return (
    <ThemeModeProvider>
      <AppThemeWrapper {...props} />
    </ThemeModeProvider>
  );
} 