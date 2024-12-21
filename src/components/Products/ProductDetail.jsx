// src/components/ProductDetail.jsx
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';

const ProductDetail = ({ products, addToCart }) => {
  const { id } = useParams();
  const product = products.find(product => product.id === id);

  if (!product) {
    return <Typography variant="h6">Producto no encontrado</Typography>;
  }

  return (
    <Card>
      <CardMedia
        component="img"
        height="300"
        image={product.imageURL}
        alt={product.title}
      />
      <CardContent>
        <Typography variant="h4">{product.title}</Typography>
        <Typography variant="h6">${product.price}</Typography>
        <Typography variant="body1">{product.description}</Typography>
        <Button variant="contained" color="primary" onClick={() => addToCart(product)}>
          Agregar al carrito
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductDetail;