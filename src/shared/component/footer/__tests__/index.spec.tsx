// Footer.test.tsx
import { render, type RenderResult } from '@testing-library/react';
import { ThemeProvider, createTheme, type Theme } from '@mui/material/styles';
import { Footer } from '..';
import '@testing-library/jest-dom';

let theme: Theme;

const renderWithTheme = (ui: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('Footer component', () => {
  let renderedFooter: RenderResult;
  theme = createTheme();
  beforeEach(() => {
    renderedFooter = renderWithTheme(<Footer />);
  });

  it('deve renderizar o texto com o ano atual', () => {
    const year = new Date().getFullYear();
    const element = renderedFooter.getByText(
      new RegExp(`${year} DevConnect - Gustavo Akira Uekita`, 'i'),
    );
    expect(element).toBeInTheDocument();
  });

  it('deve ter link para o GitHub', () => {
    const githubLink = renderedFooter.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/Gustavo-Akira/devconnect',
    );
  });

  it('deve ter link para o LinkedIn', () => {
    const linkedinLink = renderedFooter.getByRole('link', {
      name: /linkedin/i,
    });
    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/gustavo-akira-uekita/',
    );
  });

  it('deve ter link de e-mail', () => {
    const emailLink = renderedFooter.getByRole('link', { name: /email/i });
    expect(emailLink).toHaveAttribute(
      'href',
      'mailto:akirauekita2002@gmail.com',
    );
  });

  it('deve aplicar o estilo de background do tema', () => {
    const footerBox = renderedFooter.getByRole('contentinfo', { hidden: true });
    expect(footerBox).toHaveStyle(
      `background-color: ${theme.palette.primary.main}`,
    );
  });
});
