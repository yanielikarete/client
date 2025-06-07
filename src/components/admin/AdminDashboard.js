import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTransactions } from '../../actions/transaction';
import { getCryptos } from '../../actions/crypto';
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
import PeopleIcon from '@mui/icons-material/People';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import ReceiptIcon from '@mui/icons-material/Receipt';

const AdminDashboard = ({
  getTransactions,
  getCryptos,
  auth: { user },
  transaction: { transactions, loading: transactionsLoading },
  crypto: { cryptos, loading: cryptosLoading }
}) => {
  useEffect(() => {
    getTransactions();
    getCryptos();
  }, [getTransactions, getCryptos]);

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

  // Calculate total sales
  const totalSales = transactions
    .filter(t => t.status === 'completed')
    .reduce((acc, t) => acc + t.totalPrice, 0);

  // Calculate total pending transactions
  const pendingTransactions = transactions.filter(t => t.status === 'pending').length;

  // Calculate total crypto value
  const totalCryptoValue = cryptos.reduce((acc, c) => acc + (c.priceUSD * c.availableAmount), 0);

  if (transactionsLoading || cryptosLoading || user === null) {
    return <Spinner />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Panel de Administración
            </Typography>
            <Typography variant="body1">
              Bienvenido, {user && user.name}. Aquí puedes gestionar criptomonedas, transacciones y usuarios.
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
              <CurrencyBitcoinIcon sx={{ mr: 1 }} />
              <Typography component="h2" variant="h6" color="inherit">
                Valor Total de Criptomonedas
              </Typography>
            </Box>
            <Typography component="p" variant="h4">
              ${totalCryptoValue.toFixed(2)}
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
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ReceiptIcon sx={{ mr: 1 }} />
              <Typography component="h2" variant="h6" color="inherit">
                Ventas Totales
              </Typography>
            </Box>
            <Typography component="p" variant="h4">
              ${totalSales.toFixed(2)}
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
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PeopleIcon sx={{ mr: 1 }} />
              <Typography component="h2" variant="h6" color="inherit">
                Transacciones Pendientes
              </Typography>
            </Box>
            <Typography component="p" variant="h4">
              {pendingTransactions}
            </Typography>
          </Paper>
        </Grid>

        {/* Cryptos Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" component="h3">
                Criptomonedas
              </Typography>
              <Button
                component={Link}
                to="/admin/cryptos/new"
                variant="contained"
                startIcon={<AddIcon />}
              >
                Agregar Criptomoneda
              </Button>
            </Box>

            {cryptos.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nombre</TableCell>
                      <TableCell>Símbolo</TableCell>
                      <TableCell>Precio (USD)</TableCell>
                      <TableCell>Disponible</TableCell>
                      <TableCell>Valor Total</TableCell>
                      <TableCell>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cryptos.slice(0, 5).map(crypto => (
                      <TableRow key={crypto._id}>
                        <TableCell>{crypto.name}</TableCell>
                        <TableCell>{crypto.symbol}</TableCell>
                        <TableCell>${crypto.priceUSD.toFixed(2)}</TableCell>
                        <TableCell>{crypto.availableAmount}</TableCell>
                        <TableCell>${(crypto.priceUSD * crypto.availableAmount).toFixed(2)}</TableCell>
                        <TableCell>
                          <Button
                            component={Link}
                            to={`/admin/cryptos/${crypto._id}`}
                            size="small"
                            variant="outlined"
                            sx={{ mr: 1 }}
                          >
                            Editar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
                No hay criptomonedas disponibles.
              </Typography>
            )}

            {cryptos.length > 5 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                  component={Link}
                  to="/admin/cryptos"
                  variant="text"
                >
                  Ver todas las criptomonedas
                </Button>
              </Box>
            )}
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
                to="/admin/transactions"
                variant="outlined"
              >
                Ver Todas
              </Button>
            </Box>

            {transactions.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Usuario</TableCell>
                      <TableCell>Criptomoneda</TableCell>
                      <TableCell>Cantidad</TableCell>
                      <TableCell>Precio Total</TableCell>
                      <TableCell>Estado</TableCell>
                      <TableCell>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.slice(0, 5).map(transaction => (
                      <TableRow key={transaction._id}>
                        <TableCell>{transaction._id.substring(0, 8)}...</TableCell>
                        <TableCell>{transaction.user ? transaction.user.name : 'N/A'}</TableCell>
                        <TableCell>{transaction.crypto ? transaction.crypto.name : 'N/A'}</TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell>${transaction.totalPrice.toFixed(2)}</TableCell>
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
                            to={`/admin/transactions/${transaction._id}`}
                            size="small"
                            variant="outlined"
                          >
                            Gestionar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
                No hay transacciones disponibles.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  transaction: state.transaction,
  crypto: state.crypto
});

export default connect(mapStateToProps, { getTransactions, getCryptos })(AdminDashboard);