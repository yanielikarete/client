import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getCryptoById } from '../../actions/crypto';
import { createTransaction } from '../../actions/transaction';
import Spinner from '../layout/Spinner';
import NotFound from '../layout/NotFound';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  Card,
  CardMedia,
  InputAdornment
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CreateTransaction = ({
  getCryptoById,
  createTransaction,
  crypto: { crypto, loading, error }
}) => {
  const { cryptoId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: '',
    walletAddress: '',
    zelleEmail: '',
    zelleReference: ''
  });

  const { amount, walletAddress, zelleEmail, zelleReference } = formData;

  useEffect(() => {
    getCryptoById(cryptoId);
  }, [getCryptoById, cryptoId]);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createTransaction({
      crypto: cryptoId,
      amount: parseFloat(amount),
      walletAddress,
      zelleEmail,
      zelleReference
    }, navigate);
  };

  if (loading) return <Spinner />;
  if (error) return <NotFound />;
  if (!crypto) return <Spinner />;

  // Calculate total price
  const totalPrice = parseFloat(amount || 0) * crypto.priceUSD;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button
        component={Link}
        to={`/cryptos/${cryptoId}`}
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Volver a {crypto.name}
      </Button>

      <Typography variant="h4" component="h1" gutterBottom>
        Comprar {crypto.name}
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="250"
              image={crypto.image ? `/uploads/${crypto.image}` : '/img/crypto-default.jpg'}
              alt={crypto.name}
              sx={{ objectFit: 'contain', bgcolor: '#f5f5f5' }}
            />
            <Box sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>
                {crypto.name} ({crypto.symbol})
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {crypto.description}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="body1">
                  <strong>Precio:</strong> ${crypto.priceUSD.toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  <strong>Disponible:</strong> {crypto.availableAmount}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Detalles de la Transacción
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Box component="form" onSubmit={onSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    name="amount"
                    label="Cantidad a comprar"
                    type="number"
                    fullWidth
                    required
                    value={amount}
                    onChange={onChange}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">{crypto.symbol}</InputAdornment>,
                      inputProps: { min: 0.000001, max: crypto.availableAmount, step: 0.000001 }
                    }}
                    helperText={`Máximo disponible: ${crypto.availableAmount} ${crypto.symbol}`}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="walletAddress"
                    label="Dirección de Wallet"
                    fullWidth
                    required
                    value={walletAddress}
                    onChange={onChange}
                    helperText="Dirección donde recibirás tus criptomonedas"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="zelleEmail"
                    label="Email de Zelle"
                    type="email"
                    fullWidth
                    required
                    value={zelleEmail}
                    onChange={onChange}
                    helperText="Email asociado a tu cuenta de Zelle"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="zelleReference"
                    label="Referencia de Zelle (opcional)"
                    fullWidth
                    value={zelleReference}
                    onChange={onChange}
                    helperText="Referencia o nota que usarás en tu pago Zelle"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Paper sx={{ p: 2, bgcolor: 'primary.light', color: 'white' }}>
                    <Typography variant="h6" gutterBottom>
                      Resumen de la Compra
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Cantidad:</Typography>
                      <Typography>{amount || 0} {crypto.symbol}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Precio por unidad:</Typography>
                      <Typography>${crypto.priceUSD.toFixed(2)} USD</Typography>
                    </Box>
                    <Divider sx={{ my: 1, bgcolor: 'white', opacity: 0.2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="h6">Total a pagar:</Typography>
                      <Typography variant="h6">${totalPrice.toFixed(2)} USD</Typography>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" paragraph>
                    Al hacer clic en "Confirmar Compra", aceptas nuestros términos y condiciones. Después de confirmar, deberás realizar el pago a través de Zelle y subir el comprobante para procesar tu transacción.
                  </Typography>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > crypto.availableAmount}
                  >
                    Confirmar Compra
                  </Button>
                </Grid>
              </Grid>
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

export default connect(mapStateToProps, { getCryptoById, createTransaction })(CreateTransaction);