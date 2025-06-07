import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_CRYPTOS,
  GET_CRYPTO,
  CRYPTO_ERROR,
  ADD_CRYPTO,
  UPDATE_CRYPTO,
  DELETE_CRYPTO,
  CLEAR_CRYPTO
} from './types';

// Get all cryptos
export const getCryptos = () => async dispatch => {
  try {
    const res = await axios.get('/api/crypto');

    dispatch({
      type: GET_CRYPTOS,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: CRYPTO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get crypto by ID
export const getCryptoById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/crypto/${id}`);

    dispatch({
      type: GET_CRYPTO,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: CRYPTO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add crypto
export const addCrypto = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/crypto', formData, config);

    dispatch({
      type: ADD_CRYPTO,
      payload: res.data.data
    });

    dispatch(setAlert('Criptomoneda agregada', 'success'));

    history.push('/admin');
  } catch (err) {
    const errors = err.response.data.error;

    if (errors) {
      dispatch(setAlert(errors, 'error'));
    }

    dispatch({
      type: CRYPTO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update crypto
export const updateCrypto = (id, formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(`/api/crypto/${id}`, formData, config);

    dispatch({
      type: UPDATE_CRYPTO,
      payload: res.data.data
    });

    dispatch(setAlert('Criptomoneda actualizada', 'success'));

    history.push('/admin');
  } catch (err) {
    const errors = err.response.data.error;

    if (errors) {
      dispatch(setAlert(errors, 'error'));
    }

    dispatch({
      type: CRYPTO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete crypto
export const deleteCrypto = id => async dispatch => {
  if (window.confirm('¿Está seguro? Esta acción no se puede deshacer')) {
    try {
      await axios.delete(`/api/crypto/${id}`);

      dispatch({
        type: DELETE_CRYPTO,
        payload: id
      });

      dispatch(setAlert('Criptomoneda eliminada', 'success'));
    } catch (err) {
      dispatch({
        type: CRYPTO_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

// Clear crypto
export const clearCrypto = () => dispatch => {
  dispatch({ type: CLEAR_CRYPTO });
};