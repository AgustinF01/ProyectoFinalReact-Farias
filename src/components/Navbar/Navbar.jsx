// src/components/Navbar/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

const Navbar = ({ onCartClick, totalItems }) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Supercotito
        </Typography>
        <Button color="inherit" component={Link} to="/">Inicio</Button>
        <Button color="inherit" component={Link} to="/catalogo">Catálogo</Button>
        <Button color="inherit" component={Link} to="/">Sobre Nosotros</Button>
        <Button color="inherit" component={Link} to="/">Contacto</Button>
        <IconButton color="inherit" onClick={onCartClick}>
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;