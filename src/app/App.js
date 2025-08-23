import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RouterProvider } from 'react-router-dom';
import { router } from '../shared/routes';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { Header } from '../shared/component/header';
import { MainContainer } from '../shared/component/main/MainContainer';
import { Footer } from '../shared/component/footer';
export default function App() {
    return (_jsxs(ThemeProvider, { theme: theme, children: [_jsx(Header, {}), _jsx(MainContainer, { children: _jsx(RouterProvider, { router: router }) }), _jsx(Footer, {})] }));
}
