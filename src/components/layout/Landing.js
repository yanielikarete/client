import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Link to="/dashboard" />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 4
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                Compra y vende criptomonedas con Zelle
              </Typography>
              <Typography variant="h5" paragraph>
                La forma más rápida y segura de comprar criptomonedas utilizando tu cuenta Zelle.
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{ mr: 2, mb: 2 }}
                >
                  Registrarse
                </Button>
                <Button
                  component={Link}
                  to="/cryptos"
                  variant="outlined"
                  color="inherit"
                  size="large"
                  sx={{ mb: 2 }}
                >
                  Ver Criptomonedas
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/img/crypto-hero.svg"
                alt="Crypto illustration"
                sx={{
                  width: '100%',
                  maxHeight: 400,
                  objectFit: 'contain'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          ¿Por qué elegir CriptoZelle?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', pt: 4 }}>
                <SecurityIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom>
                  Seguridad Garantizada
                </Typography>
                <Typography variant="body1">
                  Todas las transacciones son verificadas y procesadas con los más altos estándares de seguridad.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', pt: 4 }}>
                <SpeedIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom>
                  Transacciones Rápidas
                </Typography>
                <Typography variant="body1">
                  Procesamos tus compras en minutos, para que puedas recibir tus criptomonedas lo antes posible.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', pt: 4 }}>
                <SupportAgentIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom>
                  Soporte 24/7
                </Typography>
                <Typography variant="body1">
                  Nuestro equipo de soporte está disponible las 24 horas para ayudarte con cualquier consulta.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            ¿Cómo funciona?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="div"
                  sx={{
                    height: 140,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'primary.light',
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 'bold'
                  }}
                >
                  1
                </CardMedia>
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Regístrate
                  </Typography>
                  <Typography variant="body1">
                    Crea una cuenta en nuestra plataforma en menos de 2 minutos.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="div"
                  sx={{
                    height: 140,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'primary.light',
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 'bold'
                  }}
                >
                  2
                </CardMedia>
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Selecciona tu Cripto
                  </Typography>
                  <Typography variant="body1">
                    Elige entre una variedad de criptomonedas disponibles en nuestra plataforma.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="div"
                  sx={{
                    height: 140,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'primary.light',
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 'bold'
                  }}
                >
                  3
                </CardMedia>
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Paga con Zelle
                  </Typography>
                  <Typography variant="body1">
                    Realiza el pago a través de Zelle y sube el comprobante para verificación.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom>
            ¿Listo para comenzar?
          </Typography>
          <Typography variant="h6" paragraph>
            Únete a miles de usuarios que ya confían en CriptoZelle para sus transacciones de criptomonedas.
          </Typography>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 2 }}
          >
            Crear una cuenta
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);