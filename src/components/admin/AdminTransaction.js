import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getTransactionById, updateTransaction, clearTransaction } from '../../actions/transaction';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const AdminTransaction = ({
  getTransactionById,
  updateTransaction,
  clearTransaction,
  transaction: { transaction, loading, error }
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [action, setAction] = useState(null);

  useEffect(() => {
    getTransactionById(id);

    return () => clearTransaction();
  }, [getTransactionById, clearTransaction, id]);

  useEffect(() => {
    if (transaction) {
      setStatus(transaction.status);
    }
  }, [transaction]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleApprove = () => {
    setAction('approve');
    setDialogOpen(true);
  };

  const handleReject = () => {
    setAction('reject');
    setDialogOpen(true);
  };

  const handleConfirm = () => {
    const newStatus = action === 'approve' ? 'completed' : 'rejected';
    updateTransaction(id, { status: newStatus }, navigate);
    setDialogOpen(false);
  };

  const handleCancel = () => {
    setDialogOpen(false);
    setAction(null);
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
        to="/admin/transactions"
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
                  Usuario
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {transaction.user ? transaction.user.name : 'N/A'} ({transaction.user ? transaction.user.email : 'N/A'})
                </Typography>
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
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
                No se ha subido ningún comprobante de pago.
              </Typography>
            )}
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Gestionar Transacción
            </Typography>
            <Divider sx={{ my: 2 }} />

            {transaction.status === 'pending' ? (
              <Box>
                <Typography variant="body1" paragraph>
                  Esta transacción está pendiente de aprobación. Verifica el comprobante de pago y toma una acción.
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<CheckCircleIcon />}
                    onClick={handleApprove}
                    disabled={!transaction.paymentProof}
                  >
                    Aprobar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<CancelIcon />}
                    onClick={handleReject}
                  >
                    Rechazar
                  </Button>
                </Box>
              </Box>
            ) : (
              <Typography variant="body1" color={transaction.status === 'completed' ? 'success.main' : 'error.main'}>
                Esta transacción ya ha sido {transaction.status === 'completed' ? 'completada' : 'rechazada'} y no puede ser modificada.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Confirmation Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCancel}
      >
        <DialogTitle>
          {action === 'approve' ? 'Confirmar Aprobación' : 'Confirmar Rechazo'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {action === 'approve'
              ? `¿Estás seguro de que deseas aprobar esta transacción? Se enviará ${transaction.amount} ${transaction.crypto?.symbol} a la wallet del usuario.`
              : '¿Estás seguro de que deseas rechazar esta transacción? Esta acción no se puede deshacer.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancelar</Button>
          <Button
            onClick={handleConfirm}
            color={action === 'approve' ? 'success' : 'error'}
            autoFocus
          >
            {action === 'approve' ? 'Aprobar' : 'Rechazar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

const mapStateToProps = state => ({
  transaction: state.transaction
});

export default connect(mapStateToProps, {
  getTransactionById,
  updateTransaction,
  clearTransaction
})(AdminTransaction);