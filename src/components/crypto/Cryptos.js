import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCryptos } from '../../actions/crypto';
import Spinner from '../layout/Spinner';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography
} from '@mui/material';

const Cryptos = ({ getCryptos, crypto: { cryptos, loading } }) => {
  useEffect(() => {
    getCryptos();
  }, [getCryptos]);

  return loading ? (
    <Spinner />
  ) : (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Criptomonedas Disponibles
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Explora nuestra selección de criptomonedas disponibles para compra. Haz clic en "Comprar" para iniciar una transacción.
        </Typography>
      </Box>

      {cryptos.length > 0 ? (
        <Grid container spacing={4}>
          {cryptos.map(crypto => (
            <Grid item key={crypto._id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={crypto.image ? `/uploads/${crypto.image}` : '/img/crypto-default.jpg'}
                  alt={crypto.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {crypto.name} ({crypto.symbol})
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {crypto.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Typography variant="body1">
                      <strong>Precio:</strong> ${crypto.priceUSD.toFixed(2)}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Disponible:</strong> {crypto.availableAmount}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    to={`/cryptos/${crypto._id}`}
                    size="small"
                    color="primary"
                  >
                    Ver Detalles
                  </Button>
                  {crypto.availableAmount > 0 && (
                    <Button
                      component={Link}
                      to={`/transactions/new/${crypto._id}`}
                      size="small"
                      variant="contained"
                      color="primary"
                    >
                      Comprar
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6" color="text.secondary">
            No hay criptomonedas disponibles en este momento.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

const mapStateToProps = state => ({
  crypto: state.crypto
});

export default connect(mapStateToProps, { getCryptos })(Cryptos);