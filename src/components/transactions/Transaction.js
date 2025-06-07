import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getTransactionById, uploadPaymentProof, clearTransaction } from '../../actions/transaction';
import Spinner from '../layout/Spinner';
import NotFound from '../layout/NotFound';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  TextField
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Transaction = ({
  getTransactionById,
  uploadPaymentProof,
  clearTransaction,
  transaction: { transaction, loading, error }
}) => {
  const { id } = useParams();
  const [file, setFile] = useState(null);

  useEffect(() => {
    getTransactionById(id);

    return () => clearTransaction();
  }, [getTransactionById, clearTransaction, id]);

  const onFileChange = e => {
    setFile(e.target.files[0]);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (file) {
      uploadPaymentProof(id, file);
      setFile(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'completed':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'completed':
        return 'Completada';
      case 'rejected':
        return 'Rechazada';
      default:
        return status;
    }
  };

  if (loading) return <Spinner />;
  if (error) return <NotFound />;
  if (!transaction) return <Spinner />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button
        component={Link}
        to="/transactions"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Volver a Transacciones
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Detalles de la Transacción
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="text.secondary">
                  ID de Transacción
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {transaction._id}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="text.secondary">
                  Estado
                </Typography>
                <Chip
                  label={getStatusText(transaction.status)}
                  color={getStatusColor(transaction.status)}
                  sx={{ mt: 0.5 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="text.secondary">
                  Criptomoneda
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {transaction.crypto ? transaction.crypto.name : 'N/A'} ({transaction.crypto ? transaction.crypto.symbol : 'N/A'})
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="text.secondary">
                  Cantidad
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {transaction.amount} {transaction.crypto ? transaction.crypto.symbol : ''}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="text.secondary">
                  Precio Unitario
                </Typography>
                <Typography variant="body1" gutterBottom>
                  ${transaction.crypto ? transaction.crypto.priceUSD.toFixed(2) : 0} USD
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="text.secondary">
                  Precio Total
                </Typography>
                <Typography variant="body1" gutterBottom>
                  ${transaction.totalPrice.toFixed(2)} USD
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="text.secondary">
                  Fecha de Creación
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {new Date(transaction.createdAt).toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="text.secondary">
                  Última Actualización
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {new Date(transaction.updatedAt).toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="text.secondary">
                  Dirección de Wallet
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {transaction.walletAddress || 'No especificada'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="text.secondary">
                  Email de Zelle
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {transaction.zelleEmail || 'No especificado'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="text.secondary">
                  Referencia de Zelle
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {transaction.zelleReference || 'No especificada'}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Comprobante de Pago
            </Typography>
            <Divider sx={{ my: 2 }} />

            {transaction.paymentProof ? (
              <Card>
                <CardMedia
                  component="img"
                  image={`/uploads/${transaction.paymentProof}`}
                  alt="Comprobante de pago"
                  sx={{ maxHeight: 300, objectFit: 'contain' }}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Comprobante subido el {new Date(transaction.updatedAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            ) : transaction.status === 'pending' ? (
              <Box component="form" onSubmit={onSubmit} sx={{ mt: 2 }}>
                <Typography variant="body1" paragraph>
                  Por favor, sube el comprobante de tu pago por Zelle para procesar tu transacción.
                </Typography>
                <TextField
                  type="file"
                  fullWidth
                  onChange={onFileChange}
                  inputProps={{ accept: 'image/*' }}
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                  disabled={!file}
                >
                  Subir Comprobante
                </Button>
              </Box>
            ) : (
              <Typography variant="body1">
                No se ha subido ningún comprobante de pago.
              </Typography>
            )}
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Instrucciones de Pago
            </Typography>
            <Divider sx={{ my: 2 }} />

            {transaction.status === 'pending' ? (
              <Box>
                <Typography variant="body1" paragraph>
                  Para completar tu compra, realiza un pago por Zelle con los siguientes datos:
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Monto a pagar: ${transaction.totalPrice.toFixed(2)} USD
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Email de Zelle: payments@criptozelle.com
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Referencia: CRIPTO-{transaction._id.substring(0, 8)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Una vez realizado el pago, sube el comprobante en la sección superior.
                </Typography>
              </Box>
            ) : transaction.status === 'completed' ? (
              <Typography variant="body1" color="success.main">
                ¡Tu transacción ha sido completada exitosamente! Las criptomonedas han sido enviadas a tu wallet.
              </Typography>
            ) : (
              <Typography variant="body1" color="error.main">
                Tu transacción ha sido rechazada. Por favor, contacta a soporte para más información.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = state => ({
  transaction: state.transaction
});

export default connect(mapStateToProps, {
  getTransactionById,
  uploadPaymentProof,
  clearTransaction
})(Transaction);