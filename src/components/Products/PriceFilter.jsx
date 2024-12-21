// src/components/Products/PriceFilter.jsx
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const PriceFilter = ({ priceOrder, onPriceOrderChange }) => {
  return (
    <FormControl fullWidth variant="outlined" style={{ marginBottom: '20px' }}>
      <InputLabel>Ordenar por Precio</InputLabel>
      <Select
        value={priceOrder}
        onChange={(e) => onPriceOrderChange(e.target.value)}
        label="Ordenar por Precio"
      >
        <MenuItem value="">
          <em>Sin Orden</em>
        </MenuItem>
        <MenuItem value="lowToHigh">Más Bajo a Más Alto</MenuItem>
        <MenuItem value="highToLow">Más Alto a Más Bajo</MenuItem>
      </Select>
    </FormControl>
  );
};

export default PriceFilter;