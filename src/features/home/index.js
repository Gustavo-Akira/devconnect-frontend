import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Container, Typography, Button, Grid, Card, CardContent, Box, CardMedia, } from '@mui/material';
import HeroImage from '../../shared/assets/images/home_hero_image.svg';
import NetworkingImage from '../../shared/assets/images/networking.svg';
import ProfileImage from '../../shared/assets/images/profile.svg';
import PublishImage from '../../shared/assets/images/publish.svg';
export const HomePage = () => {
    const features = [
        { title: 'Encontre Devs', desc: 'Busque profissionais para compartilhar' },
        { title: 'Publique Projetos', desc: 'Compartilhe sua ideia' },
        { title: 'Conexões', desc: 'Construa sua rede de contatos' },
        {
            title: 'Perfil Profissional',
            desc: 'Mostre suas habilidades e experiências',
        },
    ];
    const steps = [
        {
            title: 'Crie seu perfil',
            desc: 'Mostre suas habilidades e experiências',
            image: ProfileImage,
        },
        {
            title: 'Encontre ou publique projetos',
            desc: 'Compartilhe suas ideias',
            image: PublishImage,
        },
        {
            title: 'Colabore e cresça',
            desc: 'Construa sua rede de contatos',
            image: NetworkingImage,
        },
    ];
    return (_jsxs(_Fragment, { children: [_jsx(Box, { component: "section", sx: {
                    py: 8,
                    bgcolor: 'primary.dark',
                    color: 'primary.contrastText',
                }, children: _jsx(Container, { children: _jsxs(Grid, { container: true, spacing: 4, alignItems: "center", justifyContent: "center", children: [_jsxs(Grid, { size: { xs: 12, md: 6 }, children: [_jsxs(Typography, { variant: "h2", fontWeight: "bold", gutterBottom: true, children: ["Bem-vindo ", _jsx("br", {}), "DevConnect"] }), _jsx(Typography, { variant: "h5", sx: { mb: 4 }, children: "Conecte-se com desenvolvedores, encontre projetos e construa sua carreira." }), _jsx(Button, { variant: "contained", color: "secondary", size: "large", children: "Comece agora" })] }), _jsxs(Grid, { size: { xs: 12, md: 6 }, direction: "column", alignItems: "center", textAlign: "center", children: [_jsx("img", { src: HeroImage, alt: "", style: { width: '100%', maxWidth: '500px' }, role: "img" }), _jsx("p", { children: _jsx("a", { href: "https://storyset.com/app", style: { color: 'white' }, children: "App illustrations by Storyset" }) })] })] }) }) }), _jsx(Box, { component: "section", children: _jsx(Container, { sx: { py: 6 }, children: _jsx(Grid, { container: true, spacing: 4, children: features.map((feature, i) => (_jsx(Grid, { size: { xs: 12, md: 3 }, children: _jsx(Card, { sx: { height: '100%', textAlign: 'center' }, variant: "outlined", children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", fontWeight: "bold", children: feature.title }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { mt: 1 }, children: feature.desc })] }) }) }, i))) }) }) }), _jsx(Box, { component: "section", sx: { bgcolor: 'grey.100', py: 6 }, children: _jsxs(Container, { children: [_jsx(Typography, { variant: "h4", fontWeight: "bold", textAlign: "center", sx: { mb: 4 }, children: "Como funciona" }), _jsx(Grid, { container: true, spacing: 4, children: steps.map((step, i) => (_jsx(Grid, { size: { xs: 12, md: 4 }, children: _jsxs(Card, { sx: {
                                        textAlign: 'center',
                                        p: 3,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        height: '100%',
                                        minHeight: 200,
                                        mb: 2,
                                        padding: 0,
                                    }, variant: "outlined", children: [_jsx(CardMedia, { component: "img", alt: "", height: "300", image: step.image, sx: {
                                                width: { xs: '80%', sm: '70%', md: '60%' },
                                                height: 'auto',
                                                maxHeight: 200,
                                                minHeight: 200,
                                                objectFit: 'contain',
                                                mx: 'auto',
                                            } }), _jsx(Typography, { variant: "h3", color: "primary", fontWeight: "bold", children: i + 1 }), _jsx(Typography, { variant: "h6", sx: { mt: 2 }, children: step.title })] }) }, i))) })] }) })] }));
};
