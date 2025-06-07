import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getCryptoById, clearCrypto } from '../../actions/crypto';
import Spinner from '../layout/Spinner';
import NotFound from '../layout/NotFound';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Paper,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Crypto = ({
  getCryptoById,
  clearCrypto,
  crypto: { crypto, loading, error }
}) => {
  const { id } = useParams();

  useEffect(() => {
    getCryptoById(id);

    return () => clearCrypto();
  }, [getCryptoById, clearCrypto, id]);

  if (loading) return <Spinner />;
  if (error) return <NotFound />;
  if (!crypto) return <Spinner />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button
        component={Link}
        to="/cryptos"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Volver a Criptomonedas
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={crypto.image ? `/uploads/${crypto.image}` : '/img/crypto-default.jpg'}
              alt={crypto.name}
              sx={{ objectFit: 'contain', bgcolor: '#f5f5f5' }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {crypto.name} ({crypto.symbol})
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Precio
              </Typography>
              <Typography variant="h3" color="primary" gutterBottom>
                ${crypto.priceUSD.toFixed(2)} USD
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Disponibilidad
              </Typography>
              <Typography variant="h5" gutterBottom>
                {crypto.availableAmount} {crypto.symbol} disponibles
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Descripción
              </Typography>
              <Typography variant="body1" paragraph>
                {crypto.description}
              </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
              {crypto.availableAmount > 0 ? (
                <Button
                  component={Link}
                  to={`/transactions/new/${crypto._id}`}
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  startIcon={<ShoppingCartIcon />}
                >
                  Comprar Ahora
                </Button>
              ) : (
                <Button
                  variant="contained"
                  disabled
                  fullWidth
                  size="large"
                >
                  No Disponible
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = state => ({
  crypto: state.crypto
});

export default connect(mapStateToProps, { getCryptoById, clearCrypto })(Crypto);