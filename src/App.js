import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// Components - Layout
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Footer from './components/layout/Footer';
import NotFound from './components/layout/NotFound';

// Components - Auth
import Register from './components/auth/Register';
import Login from './components/auth/Login';

// Components - Dashboard
import Dashboard from './components/dashboard/Dashboard';

// Components - Crypto
import Cryptos from './components/crypto/Cryptos';
import Crypto from './components/crypto/Crypto';

// Components - Transactions
import Transactions from './components/transactions/Transactions';
import Transaction from './components/transactions/Transaction';
import CreateTransaction from './components/transactions/CreateTransaction';

// Components - Admin
import AdminDashboard from './components/admin/AdminDashboard';
import AdminCryptos from './components/admin/AdminCryptos';
import CryptoForm from './components/admin/CryptoForm';
import AdminTransactions from './components/admin/AdminTransactions';
import AdminTransaction from './components/admin/AdminTransaction';

// Components - Routing
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';

// Check for token
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

// Theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
  },
});

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />
          <Alert />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            
            {/* Private Routes */}
            <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
            <Route path="/cryptos" element={<Cryptos />} />
            <Route path="/cryptos/:id" element={<Crypto />} />
            <Route path="/transactions" element={<PrivateRoute component={Transactions} />} />
            <Route path="/transactions/:id" element={<PrivateRoute component={Transaction} />} />
            <Route path="/transactions/create/:cryptoId" element={<PrivateRoute component={CreateTransaction} />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminRoute component={AdminDashboard} />} />
            <Route path="/admin/cryptos" element={<AdminRoute component={AdminCryptos} />} />
            <Route path="/admin/cryptos/add" element={<AdminRoute component={CryptoForm} />} />
            <Route path="/admin/cryptos/edit/:id" element={<AdminRoute component={CryptoForm} />} />
            <Route path="/admin/transactions" element={<AdminRoute component={AdminTransactions} />} />
            <Route path="/admin/transactions/:id" element={<AdminRoute component={AdminTransaction} />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
