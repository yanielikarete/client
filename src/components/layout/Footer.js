import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          <CurrencyBitcoinIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          CriptoZelle © {new Date().getFullYear()}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {'Compra y vende criptomonedas de forma segura con '}
          <Link color="inherit" href="/">
            CriptoZelle
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;