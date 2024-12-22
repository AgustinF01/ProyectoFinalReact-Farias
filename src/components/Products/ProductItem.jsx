import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductItem = ({ product, addToCart, cart }) => {
  // Verificar la cantidad actual en el carrito
  const currentQuantity = cart && cart[product.id] ? cart[product.id].quantity : 0; 

  return (
    <Card sx={{ maxWidth: 200, margin: 'auto' }}> 
      <Link to={`/producto/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardMedia
          component="img"
          height="120" 
          image={product.imageURL}
          alt={product.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" component="div">
            De {product.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Stock: {product.stock}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${product.price}
          </Typography>
        </CardContent>
      </Link>
      <Box display="flex" justifyContent="center" padding={1}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => addToCart(product)} 
          disabled={currentQuantity >= product.stock} // Deshabilitar si se alcanza el stock
        >
          Agregar al carrito
        </Button>
      </Box>
      {currentQuantity >= product.stock && (
        <Typography variant="body2" color="error" align="center">
          No puedes agregar más de lo que hay en stock.
        </Typography>
      )}
    </Card>
  );
};

export default ProductItem;