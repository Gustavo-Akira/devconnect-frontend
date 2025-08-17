import { RouterProvider } from 'react-router-dom';
import { router } from '../shared/routes';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { Header } from '../shared/component/header';
import { MainContainer } from '../shared/component/main/MainContainer';
import { Footer } from '../shared/component/footer';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <MainContainer>
        <RouterProvider router={router} />
      </MainContainer>
      <Footer />
    </ThemeProvider>
  );
}
