import React from "react";
import { Container, Typography, Button, Grid, Card, CardContent, Box, CardMedia } from "@mui/material"
import HeroImage from '../../shared/assets/images/home_hero_image.svg';
import NetworkingImage from '../../shared/assets/images/networking.svg';
import ProfileImage from '../../shared/assets/images/profile.svg';
import PublishImage from '../../shared/assets/images/publish.svg';
export const HomePage = () =>{

  const features =[
    { title: "Encontre Devs", desc: "Busque profissionais para compartilhar" },
    { title: "Publique Projetos", desc: "Compartilhe sua ideia" },
    { title: "Conexões", desc: "Construa sua rede de contatos"},
    { title: "Perfil Profissional", desc: "Mostre suas habilidades e experiências" },
  ];

  const steps = [
    { title: "Crie seu perfil", desc: "Mostre suas habilidades e experiências", image: ProfileImage },
    { title: "Encontre ou publique projetos", desc: "Compartilhe suas ideias", image: PublishImage },
    { title: "Colabore e cresça", desc: "Construa sua rede de contatos", image: NetworkingImage },
  ]
  return (
    <>
      <Box
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          py: 4,
          textAlign: "center",
        }}
      />
      <Box component="section"
        sx={{
          py: 8,
          bgcolor: "primary.dark",
          color: "primary.contrastText",
        }}
      >
        <Container>
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid size={{xs:12,md:6}}>
              <Typography variant="h2" fontWeight="bold" gutterBottom>
                Bem-vindo <br/>DevConnect
              </Typography>
              <Typography variant="h5" sx={{ mb: 4 }}>
                Conecte-se com desenvolvedores, encontre projetos e construa sua carreira.
              </Typography>
              { 
                //TODO: Add link to sign up page 
              }
              <Button variant="contained" color="secondary" size="large">
                Comece agora
              </Button>
            </Grid>
            <Grid size={{xs:12,md:6}} direction="column" alignItems="center" textAlign="center">
              
              <img
                src={HeroImage}
                alt=""
                style={{ width: "100%", maxWidth: "500px" }}
                role="img"
              />
              <p><a href="https://storyset.com/app" style={{color:"white"}}>App illustrations by Storyset</a></p>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box component="section">
        <Container sx={{ py: 6 }}>
          <Grid container spacing={4}>
            {features.map((feature, i) => (
              <Grid size={{xs:12,md:3}} key={i}>
                <Card sx={{ height: "100%", textAlign: "center" }} variant="outlined">
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Box component="section" sx={{ bgcolor: "grey.100", py: 6 }}>
        <Container>
          <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ mb: 4 }}>
            Como funciona
          </Typography>
          <Grid container spacing={4}>
            {steps.map((step, i) => (
              <Grid  size={{xs:12, md:4}} key={i}>
              <Card sx={{
              textAlign: "center",
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
              minHeight: 200,
              mb: 2,
              padding: 0
            }} variant="outlined">
                  <CardMedia
                    component="img"
                    alt=""
                    height="300"
                    image={step.image}
                    sx={{
                      width: { xs: "80%", sm: "70%", md: "60%" },
                      height: "auto",
                      maxHeight: 200,
                      minHeight: 200,
                      objectFit: "contain",
                      mx: "auto",
                    }}
                  />
                  <Typography
                    variant="h3"
                    color="primary"
                    fontWeight="bold"
                  >
                    {i + 1}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    {step.title}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

    
    </>
  );
}
