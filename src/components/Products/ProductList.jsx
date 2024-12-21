// src/components/Products/ProductList.jsx
import React, { useState } from 'react';
import { Grid, Button, Box } from '@mui/material';
import ProductItem from './ProductItem';
import CategoryFilter from './CategoryFilter'; // Importar el filtro de categorías
import PriceFilter from './PriceFilter'; // Importar el filtro de precios

const ProductList = ({ products, addToCart, selectedCategory, onCategoryChange, priceOrder, onPriceOrderChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (priceOrder === 'lowToHigh') {
      return a.price - b.price; // Ordenar de menor a mayor
    } else if (priceOrder === 'highToLow') {
      return b.price - a.price; // Ordenar de mayor a menor
    }
    return 0; // Sin orden
  });

  // Calcular los índices de los productos a mostrar
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  return (
    <>
      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={6} md={4}>
          <CategoryFilter 
            categories={[...new Set(products.map(product => product.category))]} // Obtener categorías únicas
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <PriceFilter 
            priceOrder={priceOrder}
            onPriceOrderChange={onPriceOrderChange}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {currentItems.map(product => (
          <Grid item xs={6} sm={3} key={product.id}>
            <ProductItem product={product} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Button 
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1} 
          variant="outlined"
        >
          Anterior
        </Button>
        <Box marginX={1}>
          <span>Página {currentPage} de {totalPages}</span>
        </Box>
        <Button 
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage === totalPages} 
          variant="outlined"
        >
          Siguiente
        </Button>
      </Box>
    </>
  );
};

export default ProductList;