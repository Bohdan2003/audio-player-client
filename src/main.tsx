import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.tsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#141414',
    },
    text: {
      primary: '#ffffff',
      secondary: '#999999',
    },
    primary: {
      main: '#999999',
    },
    error: {
      main: '#ff5252',
    }
  },
  typography: {
    fontFamily: `'Inter', 'Roboto', 'sans-serif'`,
    fontSize: 14,
    body1: {
      fontSize: '1rem',
      color: '#ffffff',
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
