import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCryptos, deleteCrypto } from '../../actions/crypto';
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
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AdminCryptos = ({
  getCryptos,
  deleteCrypto,
  crypto: { cryptos, loading }
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [cryptoToDelete, setCryptoToDelete] = React.useState(null);

  useEffect(() => {
    getCryptos();
  }, [getCryptos]);

  const handleDeleteClick = (crypto) => {
    setCryptoToDelete(crypto);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (cryptoToDelete) {
      deleteCrypto(cryptoToDelete._id);
      setDeleteDialogOpen(false);
      setCryptoToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setCryptoToDelete(null);
  };

  return loading ? (
    <Spinner />
  ) : (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            component={Link}
            to="/admin"
            startIcon={<ArrowBackIcon />}
            sx={{ mr: 2 }}
          >
            Panel Admin
          </Button>
          <Typography variant="h4" component="h1">
            Gestión de Criptomonedas
          </Typography>
        </Box>
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
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Símbolo</TableCell>
                  <TableCell>Precio (USD)</TableCell>
                  <TableCell>Disponible</TableCell>
                  <TableCell>Valor Total</TableCell>
                  <TableCell>Última Actualización</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cryptos.map(crypto => (
                  <TableRow key={crypto._id}>
                    <TableCell>{crypto.name}</TableCell>
                    <TableCell>{crypto.symbol}</TableCell>
                    <TableCell>${crypto.priceUSD.toFixed(2)}</TableCell>
                    <TableCell>{crypto.availableAmount}</TableCell>
                    <TableCell>${(crypto.priceUSD * crypto.availableAmount).toFixed(2)}</TableCell>
                    <TableCell>{new Date(crypto.updatedAt).toLocaleString()}</TableCell>
                    <TableCell>
                      <IconButton
                        component={Link}
                        to={`/admin/cryptos/${crypto._id}`}
                        color="primary"
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDeleteClick(crypto)}
                      >
                        <DeleteIcon />
                      </IconButton>
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
            No hay criptomonedas disponibles.
          </Typography>
          <Button
            component={Link}
            to="/admin/cryptos/new"
            variant="contained"
            startIcon={<AddIcon />}
          >
            Agregar Criptomoneda
          </Button>
        </Paper>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar la criptomoneda {cryptoToDelete?.name}? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancelar</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

const mapStateToProps = state => ({
  crypto: state.crypto
});

export default connect(mapStateToProps, { getCryptos, deleteCrypto })(AdminCryptos);