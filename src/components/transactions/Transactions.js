import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTransactions } from '../../actions/transaction';
import Spinner from '../layout/Spinner';
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Transactions = ({
  getTransactions,
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

  return loading ? (
    <Spinner />
  ) : (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            component={Link}
            to="/dashboard"
            startIcon={<ArrowBackIcon />}
            sx={{ mr: 2 }}
          >
            Dashboard
          </Button>
          <Typography variant="h4" component="h1">
            Mis Transacciones
          </Typography>
        </Box>
        <Button
          component={Link}
          to="/cryptos"
          variant="contained"
          color="primary"
        >
          Nueva Transacción
        </Button>
      </Box>

      {transactions.length > 0 ? (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Criptomoneda</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Precio Total</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map(transaction => (
                  <TableRow key={transaction._id}>
                    <TableCell>{transaction._id.substring(0, 8)}...</TableCell>
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
        </Paper>
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" paragraph>
            No tienes transacciones aún.
          </Typography>
          <Button
            component={Link}
            to="/cryptos"
            variant="contained"
            color="primary"
          >
            Comprar Criptomonedas
          </Button>
        </Paper>
      )}
    </Container>
  );
};

const mapStateToProps = state => ({
  transaction: state.transaction
});

export default connect(mapStateToProps, { getTransactions })(Transactions);