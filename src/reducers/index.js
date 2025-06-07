import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import crypto from './crypto';
import transaction from './transaction';

export default combineReducers({
  auth,
  alert,
  crypto,
  transaction
});