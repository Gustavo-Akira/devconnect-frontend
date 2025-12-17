import { RouterProvider } from 'react-router-dom';
import { router } from '../shared/routes';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { Header } from '../shared/component/header';
import { MainContainer } from '../shared/component/main/MainContainer';
import { Footer } from '../shared/component/footer';
import { AuthProvider } from '../shared/context/auth/authContext';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Header />
        <MainContainer>
          <RouterProvider router={router} />
        </MainContainer>
        <Footer />
      </AuthProvider>
    </ThemeProvider>
  );
}
