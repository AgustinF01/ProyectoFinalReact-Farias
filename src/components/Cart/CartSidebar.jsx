import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Typography, Button, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CartSidebar = ({ open, onClose, cart, clearCart, removeFromCart }) => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [quantityToRemove, setQuantityToRemove] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleRemoveClick = (item) => {
    setSelectedItem(item);
    setQuantityToRemove(1); 
    setDialogOpen(true); 
  };

  const handleConfirmRemove = () => {
    if (selectedItem) {
      removeFromCart(selectedItem.id, quantityToRemove);
    }
    setDialogOpen(false); 
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div style={{ width: 370, padding: 20 }}>
        <Typography variant="h6">Carrito de Compras</Typography>
        <List>
          {cart.map((item, index) => (
            <ListItem key={index} secondaryAction={
              <Box display="flex" justifyContent="flex-end" width="100%">
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  onClick={() => handleRemoveClick(item)} 
                  style={{ width: '100%' }}
                >
                  Eliminar
                </Button>
              </Box>
            }>
              <ListItemText primary={`${item.title} (x${item.quantity})`} secondary={`$${item.price * item.quantity}`} />
            </ListItem>
          ))}
        </List>
        <Typography variant="h6">Total: ${total}</Typography>
        <Box display="flex" flexDirection="column" gap={1}>
          <Button variant="contained" color="primary" onClick={clearCart} style={{ width: '100%' }}>
            Limpiar Carrito
          </Button>
          <Button variant="contained" color="primary" onClick={() => navigate('/checkout')} style={{ width: '100%' }}>
            Finalizar Compra
          </Button>
        </Box>
      </div>

      
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Eliminar Producto</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Cantidad a eliminar"
            type="number"
            fullWidth
            value={quantityToRemove}
            onChange={(e) => setQuantityToRemove(Math.max(1, Math.min(selectedItem?.quantity, e.target.value)))}
            inputProps={{ min: 1, max: selectedItem?.quantity }} // Limitar la cantidad
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmRemove} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Drawer>
  );
};

export default CartSidebar;