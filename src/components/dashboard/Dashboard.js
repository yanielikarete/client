import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTransactions } from '../../actions/transaction';
import Spinner from '../layout/Spinner';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const Dashboard = ({
  getTransactions,
  auth: { user },
  transaction: { transactions, loading }
}) => {
  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

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

  return loading || user === null ? (
    <Spinner />
  ) : (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Bienvenido, {user && user.name}
            </Typography>
            <Typography variant="body1">
              Este es tu panel de control donde puedes gestionar tus transacciones de criptomonedas.
            </Typography>
          </Paper>
        </Grid>

        {/* Stats Section */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: 'primary.light',
              color: 'white'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AccountBalanceWalletIcon sx={{ mr: 1 }} />
              <Typography component="h2" variant="h6" color="inherit">
                Transacciones Totales
              </Typography>
            </Box>
            <Typography component="p" variant="h4">
              {transactions.length}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: 'success.light',
              color: 'white'
            }}
          >
            <Typography component="h2" variant="h6" color="inherit" gutterBottom>
              Transacciones Completadas
            </Typography>
            <Typography component="p" variant="h4">
              {transactions.filter(t => t.status === 'completed').length}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: 'warning.light',
              color: 'white'
            }}
          >
            <Typography component="h2" variant="h6" color="inherit" gutterBottom>
              Transacciones Pendientes
            </Typography>
            <Typography component="p" variant="h4">
              {transactions.filter(t => t.status === 'pending').length}
            </Typography>
          </Paper>
        </Grid>

        {/* Recent Transactions */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" component="h3">
                Transacciones Recientes
              </Typography>
              <Button
                component={Link}
                to="/cryptos"
                variant="contained"
                startIcon={<AddIcon />}
              >
                Nueva Transacción
              </Button>
            </Box>

            {transactions.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Criptomoneda</TableCell>
                      <TableCell>Cantidad</TableCell>
                      <TableCell>Precio Total</TableCell>
                      <TableCell>Fecha</TableCell>
                      <TableCell>Estado</TableCell>
                      <TableCell>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.slice(0, 5).map(transaction => (
                      <TableRow key={transaction._id}>
                        <TableCell>{transaction.crypto ? transaction.crypto.name : 'N/A'}</TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell>${transaction.totalPrice.toFixed(2)}</TableCell>
                        <TableCell>{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Chip
                            label={getStatusText(transaction.status)}
                            color={getStatusColor(transaction.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            component={Link}
                            to={`/transactions/${transaction._id}`}
                            size="small"
                            variant="outlined"
                          >
                            Ver Detalles
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
                No tienes transacciones aún. ¡Comienza comprando criptomonedas!
              </Typography>
            )}

            {transactions.length > 5 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                  component={Link}
                  to="/transactions"
                  variant="text"
                >
                  Ver todas las transacciones
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  transaction: state.transaction
});

export default connect(mapStateToProps, { getTransactions })(Dashboard);