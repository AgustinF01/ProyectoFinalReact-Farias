import React, { useState } from 'react';
import { Grid, Button, Box } from '@mui/material';
import ProductItem from './ProductItem';
import CategoryFilter from './CategoryFilter'; 
import PriceFilter from './PriceFilter'; 

const ProductList = ({ products, addToCart, selectedCategory, onCategoryChange, priceOrder, onPriceOrderChange, cart }) => { // Asegúrate de recibir cart aquí
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (priceOrder === 'lowToHigh') {
      return a.price - b.price;
    } else if (priceOrder === 'highToLow') {
      return b.price - a.price; 
    }
    return 0; 
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
            categories={[...new Set(products.map(product => product.category))]} 
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
            <ProductItem product={product} addToCart={addToCart} cart={cart} /> {/* Pasar el carrito aquí */}
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