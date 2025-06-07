import {
  GET_TRANSACTIONS,
  GET_TRANSACTION,
  TRANSACTION_ERROR,
  ADD_TRANSACTION,
  UPDATE_TRANSACTION,
  CLEAR_TRANSACTION,
  UPLOAD_PAYMENT_PROOF
} from '../actions/types';

const initialState = {
  transactions: [],
  transaction: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: payload,
        loading: false
      };
    case GET_TRANSACTION:
      return {
        ...state,
        transaction: payload,
        loading: false
      };
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [payload, ...state.transactions],
        loading: false
      };
    case UPDATE_TRANSACTION:
    case UPLOAD_PAYMENT_PROOF:
      return {
        ...state,
        transactions: state.transactions.map(transaction =>
          transaction._id === payload._id ? payload : transaction
        ),
        transaction: payload,
        loading: false
      };
    case CLEAR_TRANSACTION:
      return {
        ...state,
        transaction: null,
        loading: false
      };
    case TRANSACTION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}