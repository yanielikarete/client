import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_TRANSACTIONS,
  GET_TRANSACTION,
  TRANSACTION_ERROR,
  ADD_TRANSACTION,
  UPDATE_TRANSACTION,
  CLEAR_TRANSACTION,
  UPLOAD_PAYMENT_PROOF
} from './types';

// Get all transactions
export const getTransactions = () => async dispatch => {
  try {
    const res = await axios.get('/api/transactions');

    dispatch({
      type: GET_TRANSACTIONS,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get transaction by ID
export const getTransactionById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/transactions/${id}`);

    dispatch({
      type: GET_TRANSACTION,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create transaction
export const createTransaction = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/transactions', formData, config);

    dispatch({
      type: ADD_TRANSACTION,
      payload: res.data.data
    });

    dispatch(setAlert('Transacción creada', 'success'));

    history.push(`/transactions/${res.data.data._id}`);
  } catch (err) {
    const errors = err.response.data.error;

    if (errors) {
      dispatch(setAlert(errors, 'error'));
    }

    dispatch({
      type: TRANSACTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update transaction
export const updateTransaction = (id, formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(`/api/transactions/${id}`, formData, config);

    dispatch({
      type: UPDATE_TRANSACTION,
      payload: res.data.data
    });

    dispatch(setAlert('Transacción actualizada', 'success'));
  } catch (err) {
    const errors = err.response.data.error;

    if (errors) {
      dispatch(setAlert(errors, 'error'));
    }

    dispatch({
      type: TRANSACTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Upload payment proof
export const uploadPaymentProof = (id, file) => async dispatch => {
  try {
    const formData = new FormData();
    formData.append('proof', file);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const res = await axios.put(`/api/transactions/${id}/proof`, formData, config);

    dispatch({
      type: UPLOAD_PAYMENT_PROOF,
      payload: res.data.data
    });

    dispatch(setAlert('Comprobante subido', 'success'));
  } catch (err) {
    const errors = err.response.data.error;

    if (errors) {
      dispatch(setAlert(errors, 'error'));
    }

    dispatch({
      type: TRANSACTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Clear transaction
export const clearTransaction = () => dispatch => {
  dispatch({ type: CLEAR_TRANSACTION });
};