// src/components/Products/ProductCarousel.jsx
import React from 'react';
import Slider from 'react-slick';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductCarousel = ({ products }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Slider {...settings}>
      {products.map((product) => (
        <Link to={`/producto/${product.id}`} key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Card sx={{ maxWidth: 300, margin: 'auto' }}>
            <CardMedia
              component="img"
              height="140"
              image={product.imageURL}
              alt={product.title}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ${product.price}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </Slider>
  );
};

export default ProductCarousel;