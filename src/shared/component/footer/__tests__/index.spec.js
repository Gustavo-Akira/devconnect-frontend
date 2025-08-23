import { jsx as _jsx } from "react/jsx-runtime";
// Footer.test.tsx
import { render } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Footer } from '..';
import '@testing-library/jest-dom';
let theme;
const renderWithTheme = (ui) => {
    return render(_jsx(ThemeProvider, { theme: theme, children: ui }));
};
describe('Footer component', () => {
    let renderedFooter;
    theme = createTheme();
    beforeEach(() => {
        renderedFooter = renderWithTheme(_jsx(Footer, {}));
    });
    it('deve renderizar o texto com o ano atual', () => {
        const year = new Date().getFullYear();
        const element = renderedFooter.getByText(new RegExp(`${year} DevConnect - Gustavo Akira Uekita`, 'i'));
        expect(element).toBeInTheDocument();
    });
    it('deve ter link para o GitHub', () => {
        const githubLink = renderedFooter.getByRole('link', { name: /github/i });
        expect(githubLink).toHaveAttribute('href', 'https://github.com/Gustavo-Akira/devconnect');
    });
    it('deve ter link para o LinkedIn', () => {
        const linkedinLink = renderedFooter.getByRole('link', {
            name: /linkedin/i,
        });
        expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/gustavo-akira-uekita/');
    });
    it('deve ter link de e-mail', () => {
        const emailLink = renderedFooter.getByRole('link', { name: /email/i });
        expect(emailLink).toHaveAttribute('href', 'mailto:akirauekita2002@gmail.com');
    });
    it('deve aplicar o estilo de background do tema', () => {
        const footerBox = renderedFooter.getByRole('contentinfo', { hidden: true });
        expect(footerBox).toHaveStyle(`background-color: ${theme.palette.primary.main}`);
    });
});
