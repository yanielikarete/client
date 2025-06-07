import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const authLinks = (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <AccountCircleIcon sx={{ color: 'white', fontSize: 32 }} />
      </IconButton>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem component={Link} to="/dashboard" onClick={handleCloseUserMenu}>
          <Typography textAlign="center">Dashboard</Typography>
        </MenuItem>
        <MenuItem component={Link} to="/transactions" onClick={handleCloseUserMenu}>
          <Typography textAlign="center">Mis Transacciones</Typography>
        </MenuItem>
        {user && user.role === 'admin' && (
          <MenuItem component={Link} to="/admin" onClick={handleCloseUserMenu}>
            <Typography textAlign="center">Panel Admin</Typography>
          </MenuItem>
        )}
        <MenuItem onClick={() => {
          handleCloseUserMenu();
          logout();
        }}>
          <Typography textAlign="center">Cerrar Sesión</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );

  const guestLinks = (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      <Button
        component={Link}
        to="/login"
        sx={{ my: 2, color: 'white', display: 'block' }}
      >
        Iniciar Sesión
      </Button>
      <Button
        component={Link}
        to="/register"
        sx={{ my: 2, color: 'white', display: 'block' }}
      >
        Registrarse
      </Button>
    </Box>
  );

  const mobileGuestLinks = (
    <>
      <MenuItem component={Link} to="/login" onClick={handleCloseNavMenu}>
        <Typography textAlign="center">Iniciar Sesión</Typography>
      </MenuItem>
      <MenuItem component={Link} to="/register" onClick={handleCloseNavMenu}>
        <Typography textAlign="center">Registrarse</Typography>
      </MenuItem>
    </>
  );

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CurrencyBitcoinIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CriptoZelle
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem component={Link} to="/" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Inicio</Typography>
              </MenuItem>
              <MenuItem component={Link} to="/cryptos" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Criptomonedas</Typography>
              </MenuItem>
              {!isAuthenticated && !loading && mobileGuestLinks}
            </Menu>
          </Box>

          <CurrencyBitcoinIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CriptoZelle
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              component={Link}
              to="/"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Inicio
            </Button>
            <Button
              component={Link}
              to="/cryptos"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Criptomonedas
            </Button>
          </Box>

          {!loading && (isAuthenticated ? authLinks : guestLinks)}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);