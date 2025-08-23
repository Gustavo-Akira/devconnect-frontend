import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { Header } from '../index';
import { theme } from '../../../../app/theme';
import '@testing-library/jest-dom';
describe('Header Component', () => {
    it('should toggle the navigation menu on mobile view when the header is clicked', async () => {
        render(_jsx(ThemeProvider, { theme: theme, children: _jsx(Header, {}) }));
        const headerContainer = screen.getByRole('header');
        expect(screen.getByTestId('menu-closed')).toBeInTheDocument();
        fireEvent.click(headerContainer);
        expect(screen.getByTestId('menu-open')).toBeInTheDocument();
    });
    it('should display navigation links', () => {
        render(_jsx(ThemeProvider, { theme: theme, children: _jsx(Header, {}) }));
        expect(screen.getByText('Signin')).toBeInTheDocument();
        expect(screen.getByText('Signup')).toBeInTheDocument();
    });
});
