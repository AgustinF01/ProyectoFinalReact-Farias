import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: '#1976d2', 
        color: 'white', 
        py: 2, 
        width: '100%', 
        position: 'relative', 
        marginTop: '10%',
      }}
    >
      <Container>
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} Supercotito. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
