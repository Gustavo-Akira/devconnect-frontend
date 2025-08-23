import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { Header } from '../index';
import { theme } from '../../../../app/theme';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

describe('Header Component', () => {
  it('should toggle the navigation menu on mobile view when the header is clicked', async () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Header />
        </ThemeProvider>
        ,
      </MemoryRouter>,
    );

    const headerContainer = screen.getByRole('header');
    expect(screen.getByTestId('menu-closed')).toBeInTheDocument();
    fireEvent.click(headerContainer);
    expect(screen.getByTestId('menu-open')).toBeInTheDocument();
  });

  it('should display navigation links', () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Header />
        </ThemeProvider>
        ,
      </MemoryRouter>,
    );

    expect(screen.getByText('Signin')).toBeInTheDocument();
    expect(screen.getByText('Signup')).toBeInTheDocument();
  });
});
