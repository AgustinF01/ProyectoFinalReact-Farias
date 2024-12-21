// src/components/Products/CategoryFilter.jsx
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <FormControl fullWidth variant="outlined" style={{ marginBottom: '20px' }}>
      <InputLabel>Categoría</InputLabel>
      <Select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        label="Categoría"
      >
        <MenuItem value="">
          <em>Todas</em>
        </MenuItem>
        {categories.map((category, index) => (
          <MenuItem key={index} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryFilter;