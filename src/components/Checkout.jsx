import React, { useState } from 'react';
import { Typography, Button, List, ListItem, ListItemText, Box, TextField, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { db } from '../firebase'; // Asegúrate de importar tu configuración de Firebase
import { collection, addDoc } from 'firebase/firestore';
import jsPDF from 'jspdf'; // Importar jsPDF

const Checkout = ({ cart, removeFromCart, clearCart }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    cardHolderName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    dni: ''
  });
  
  const [ticket, setTicket] = useState(null); // Estado para el ticket de compra
  const [dialogOpen, setDialogOpen] = useState(false); // Estado para el diálogo de eliminación
  const [selectedItem, setSelectedItem] = useState(null); // Producto seleccionado para eliminar
  const [quantityToRemove, setQuantityToRemove] = useState(1); // Cantidad a eliminar

  // Calcular totales
  const total = Object.values(cart).reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = total * 0.21; // Suponiendo un impuesto del 21%
  const totalWithTax = total + tax;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generar un ID de compra
    const purchaseId = `purchase_${Date.now()}`; // Generar un ID único basado en la fecha y hora

    // Crear un objeto de compra
    const purchaseData = {
      purchaseId,
      user: formData,
      cart,
      totalWithoutTax: total, // Total sin impuestos
      taxAmount: tax, // Cantidad de impuestos
      totalWithTax: totalWithTax, // Total con impuestos
      createdAt: new Date()
    };

    try {
      // Subir los datos a Firestore
      await addDoc(collection(db, 'purchases'), purchaseData);
      setTicket(purchaseData); // Guardar el ticket en el estado
      clearCart(); // Limpiar el carrito después de la compra

      // Limpiar los campos del formulario
      setFormData({
        name: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        cardHolderName: '',
        cardNumber: '',
        cardExpiry: '',
        cardCVC: '',
        dni: ''
      });
    } catch (error) {
      console.error("Error al guardar la compra: ", error);
    }
  };

  const handleRemoveClick = (item) => {
    setSelectedItem(item);
    setQuantityToRemove(1); // Reiniciar la cantidad a eliminar
    setDialogOpen(true); // Abrir el diálogo
  };

  const handleConfirmRemove = () => {
    if (selectedItem) {
      removeFromCart(selectedItem.id, quantityToRemove); // Lógica para eliminar el producto
    }
    setDialogOpen(false); // Cerrar el diálogo
  };

  // Función para generar y descargar el PDF
  const downloadTicket = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Ticket de Compra", 20, 20);
    doc.setFontSize(12);
    
    // Información del cliente
    doc.text(`ID de Compra: ${ticket.purchaseId}`, 20, 30);
    doc.text(`Nombre: ${ticket.user.name} ${ticket.user.lastName}`, 20, 40);
    doc.text(`Teléfono: ${ticket.user.phone}`, 20, 50);
    doc.text(`Email: ${ticket.user.email}`, 20, 60);
    doc.text(`Dirección: ${ticket.user.address}`, 20, 70);
    
    // Totales
    doc.text(`Total sin Impuestos: $${ticket.totalWithoutTax?.toFixed(2) || 0}`, 20, 80 , doc.text(`Impuestos (21%): $${ticket.taxAmount?.toFixed(2) || 0}`, 20, 90));
    doc.text(`Total con Impuestos: $${ticket.totalWithTax?.toFixed(2) || 0}`, 20, 100);
    
    // Listado de productos
    doc.text("Productos Comprados:", 20, 110);
    let yPosition = 120;
    Object.entries(ticket.cart).forEach(([key, item]) => {
      doc.text(`${item.title} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`, 20, yPosition);
      yPosition += 10;
    });

    // Agregar un pie de página
    doc.setFontSize(10);
    doc.text("Gracias por su compra!", 20, yPosition + 10);
    
    doc.save(`ticket_${ticket.purchaseId}.pdf`);
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Checkout
      </Typography>
      
      {/* Mostrar el listado de productos si hay productos en el carrito */}
      {Object.keys(cart).length > 0 ? (
        <Box mb={2}>
          <Typography variant="h5">Productos en el Carrito</Typography>
          <List>
            {Object.values(cart).map((item, index) => (
              <ListItem key={index} secondaryAction={
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  onClick={() => handleRemoveClick(item)} >
                  Eliminar
                </Button>
              }>
                <ListItemText primary={`${item.title} (x${item.quantity})`} secondary={`$${(item.price * item.quantity).toFixed(2)}`} />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6">Total sin Impuestos: ${total.toFixed(2)}</Typography>
          <Typography variant="h6">Impuestos (21%): ${tax.toFixed(2)}</Typography>
          <Typography variant="h6">Total con Impuestos: ${totalWithTax.toFixed(2)}</Typography>
        </Box>
      ) : (
        <Typography variant="h6" align="center">No hay productos en el carrito.</Typography>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Nombre" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              fullWidth 
              required 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Apellido" 
              name="lastName" 
              value={formData.lastName} 
              onChange={handleChange} 
              fullWidth 
              required 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label="Teléfono" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              fullWidth 
              required 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label="Email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              fullWidth 
              required 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label="Dirección" 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              fullWidth 
              required 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Nombre en la Tarjeta" 
              name="cardHolderName" 
              value={formData.cardHolderName} 
              onChange={handleChange} 
              fullWidth 
              required 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Número de Tarjeta" 
              name="cardNumber" 
              value={formData.cardNumber} 
              onChange={handleChange} 
              fullWidth 
              required 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Fecha de Expiración" 
              name="cardExpiry" 
              value={formData.cardExpiry} 
              onChange={handleChange} 
              fullWidth 
              required 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="CVC" 
              name="cardCVC" 
              value={formData.cardCVC} 
              onChange={handleChange} 
              fullWidth 
              required 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label="DNI" 
              name="dni" 
              value={formData.dni} 
              onChange={handleChange} 
              fullWidth 
              required 
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Confirmar Compra
        </Button>
      </form>

      {/* Mostrar el ticket de compra si se ha generado */}
      {ticket && (
        <Box mt={4}>
          <Typography variant="h5" align="center">Ticket de Compra</Typography>
          <Typography variant="body1">ID de Compra: {ticket.purchaseId}</Typography>
          <Typography variant="body1">Nombre: {ticket.user.name} {ticket.user.lastName}</Typography>
          <Typography variant="body1">Teléfono: {ticket.user.phone}</Typography>
          <Typography variant="body1">Email: {ticket.user.email}</Typography>
          <Typography variant="body1">Dirección: {ticket.user.address}</Typography>
          <Typography variant="body1">Total sin Impuestos: ${ticket.totalWithoutTax?.toFixed(2) || 0}</Typography>
          <Typography variant="body1">Impuestos (21%): ${ticket.taxAmount?.toFixed(2) || 0}</Typography>
          <Typography variant="body1">Total con Impuestos: ${ticket.totalWithTax?.toFixed(2) || 0}</Typography>
          
          {/* Listado de productos en el ticket */}
          <Typography variant="h6">Productos Comprados:</Typography>
          <List>
            {Object.entries(ticket.cart).map(([key, item]) => (
              <ListItem key={key}>
                <ListItemText primary={`${item.title} (x${item.quantity})`} secondary={`$${(item.price * item.quantity).toFixed(2)}`} />
              </ListItem>
            ))}
          </List>

          {/* Botón para descargar el ticket como PDF */}
          <Button variant="contained" color="primary" onClick={downloadTicket}>
            Descargar Ticket como PDF
          </Button>
        </Box>
      )}

      {/* Diálogo de confirmación para eliminar un producto */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Eliminar Producto</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que deseas eliminar {selectedItem?.title}?</Typography>
          <TextField 
            label="Cantidad a eliminar" 
            type="number" 
            value={quantityToRemove} 
            onChange={(e) => setQuantityToRemove(e.target.value)} 
            fullWidth 
            required 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">Cancelar</Button>
          <Button onClick={handleConfirmRemove} color="secondary">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Checkout;