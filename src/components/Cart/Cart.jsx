import React from 'react';
import { List, ListItem, ListItemText, Typography, Button } from '@mui/material';

const Cart = ({ cart }) => {
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <Typography variant="h6">Carrito de Compras</Typography>
      <List>
        {cart.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item.title} secondary={`$${item.price}`} />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">Total: ${total}</Typography>
    </div>
  );
};

export default Cart;