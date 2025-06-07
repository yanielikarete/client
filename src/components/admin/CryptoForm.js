import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getCryptoById, addCrypto, updateCrypto, clearCrypto } from '../../actions/crypto';
import Spinner from '../layout/Spinner';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  InputAdornment
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';

const CryptoForm = ({
  getCryptoById,
  addCrypto,
  updateCrypto,
  clearCrypto,
  crypto: { crypto, loading }
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = id !== 'new';

  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    availableAmount: '',
    priceUSD: '',
    description: ''
  });

  const [fileData, setFileData] = useState({
    image: null
  });

  const { name, symbol, availableAmount, priceUSD, description } = formData;
  const { image } = fileData;

  useEffect(() => {
    if (isEditing) {
      getCryptoById(id);
    } else {
      clearCrypto();
    }

    return () => clearCrypto();
  }, [getCryptoById, clearCrypto, id, isEditing]);

  useEffect(() => {
    if (!loading && crypto && isEditing) {
      setFormData({
        name: crypto.name || '',
        symbol: crypto.symbol || '',
        availableAmount: crypto.availableAmount || '',
        priceUSD: crypto.priceUSD || '',
        description: crypto.description || ''
      });
    }
  }, [crypto, loading, isEditing]);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onFileChange = e => {
    setFileData({ ...fileData, [e.target.name]: e.target.files[0] });
  };

  const onSubmit = e => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('name', name);
    formDataToSubmit.append('symbol', symbol);
    formDataToSubmit.append('availableAmount', availableAmount);
    formDataToSubmit.append('priceUSD', priceUSD);
    formDataToSubmit.append('description', description);

    if (image) {
      formDataToSubmit.append('image', image);
    }

    if (isEditing) {
      updateCrypto(id, formDataToSubmit, navigate);
    } else {
      addCrypto(formDataToSubmit, navigate);
    }
  };

  if (loading && isEditing) return <Spinner />;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Button
        component={Link}
        to="/admin/cryptos"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Volver a Criptomonedas
      </Button>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {isEditing ? 'Editar Criptomoneda' : 'Agregar Nueva Criptomoneda'}
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Box component="form" onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                label="Nombre"
                fullWidth
                required
                value={name}
                onChange={onChange}
                helperText="Nombre completo de la criptomoneda"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="symbol"
                label="Símbolo"
                fullWidth
                required
                value={symbol}
                onChange={onChange}
                helperText="Símbolo de la criptomoneda (ej. BTC, ETH)"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="availableAmount"
                label="Cantidad Disponible"
                type="number"
                fullWidth
                required
                value={availableAmount}
                onChange={onChange}
                InputProps={{
                  inputProps: { min: 0, step: 0.000001 }
                }}
                helperText="Cantidad disponible para venta"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="priceUSD"
                label="Precio en USD"
                type="number"
                fullWidth
                required
                value={priceUSD}
                onChange={onChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  inputProps: { min: 0, step: 0.01 }
                }}
                helperText="Precio por unidad en dólares"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="description"
                label="Descripción"
                multiline
                rows={4}
                fullWidth
                value={description}
                onChange={onChange}
                helperText="Descripción detallada de la criptomoneda"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Imagen
              </Typography>
              <input
                accept="image/*"
                id="image"
                name="image"
                type="file"
                onChange={onFileChange}
                style={{ marginBottom: '16px', display: 'block' }}
              />
              <Typography variant="body2" color="text.secondary">
                {isEditing && crypto.image ? 'Ya hay una imagen cargada. Sube una nueva para reemplazarla.' : 'Sube una imagen representativa de la criptomoneda.'}
              </Typography>
            </Grid>

            {isEditing && crypto.image && (
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Imagen Actual
                </Typography>
                <Box
                  component="img"
                  src={`/uploads/${crypto.image}`}
                  alt={crypto.name}
                  sx={{
                    maxWidth: '100%',
                    maxHeight: '200px',
                    objectFit: 'contain',
                    display: 'block',
                    mb: 2
                  }}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
                sx={{ mt: 2 }}
              >
                {isEditing ? 'Actualizar Criptomoneda' : 'Crear Criptomoneda'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

const mapStateToProps = state => ({
  crypto: state.crypto
});

export default connect(mapStateToProps, {
  getCryptoById,
  addCrypto,
  updateCrypto,
  clearCrypto
})(CryptoForm);