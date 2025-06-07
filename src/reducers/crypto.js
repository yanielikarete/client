import {
  GET_CRYPTOS,
  GET_CRYPTO,
  CRYPTO_ERROR,
  ADD_CRYPTO,
  UPDATE_CRYPTO,
  DELETE_CRYPTO,
  CLEAR_CRYPTO
} from '../actions/types';

const initialState = {
  cryptos: [],
  crypto: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CRYPTOS:
      return {
        ...state,
        cryptos: payload,
        loading: false
      };
    case GET_CRYPTO:
      return {
        ...state,
        crypto: payload,
        loading: false
      };
    case ADD_CRYPTO:
      return {
        ...state,
        cryptos: [payload, ...state.cryptos],
        loading: false
      };
    case UPDATE_CRYPTO:
      return {
        ...state,
        cryptos: state.cryptos.map(crypto =>
          crypto._id === payload._id ? payload : crypto
        ),
        loading: false
      };
    case DELETE_CRYPTO:
      return {
        ...state,
        cryptos: state.cryptos.filter(crypto => crypto._id !== payload),
        loading: false
      };
    case CLEAR_CRYPTO:
      return {
        ...state,
        crypto: null,
        loading: false
      };
    case CRYPTO_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}