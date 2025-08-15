import { RouterProvider } from 'react-router-dom';
import { router } from '../shared/routes';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';

export default function App() {
  return <ThemeProvider theme={theme}><RouterProvider router={router} /></ThemeProvider>;
}
