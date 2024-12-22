import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './components/Products/ProductList';
import ProductDetail from './components/Products/ProductDetail';
import Checkout from './components/Checkout';
import CartSidebar from './components/Cart/CartSidebar';
import ProductCarousel from './components/Products/ProductCarousel';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Container, Typography, Button, Box } from '@mui/material';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Loading from './components/Loading'; 
import { ToastContainer, toast } from 'react-toastify';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceOrder, setPriceOrder] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const productsCollection = collection(db, 'products');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (product) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      const currentQuantity = newCart[product.id] ? newCart[product.id].quantity : 0;
  
      // Verificar si se puede agregar más del stock disponible
      if (currentQuantity < product.stock) {
        if (newCart[product.id]) {
          newCart[product.id].quantity += 1;
        } else {
          newCart[product.id] = { ...product, quantity: 1 };
        }
        toast.success(`${product.title} agregado al carrito!`);
      } else {
        toast.error(`No puedes agregar más de ${product.stock} unidades de ${product.title}.`);
      }
  
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePriceOrderChange = (order) => {
    setPriceOrder(order);
  };

  const removeFromCart = (productId, quantity) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (newCart[productId]) {
        if (newCart[productId].quantity > quantity) {
          newCart[productId].quantity -= quantity;
        } else {
          delete newCart[productId];
        }
        toast.success(`Se eliminaron ${quantity} de ${newCart[productId]?.title || 'producto'} del carrito!`);
      }
      localStorage.setItem('cart', JSON.stringify(newCart)); 
      return newCart;
    });
  };

  const clearCart = () => {
    setCart({});
    localStorage.removeItem('cart'); 
    toast.success('El carrito ha sido limpiado!');
  };

  const totalItemsInCart = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      {loading ? ( 
        <Loading />
      ) : (
        <>
          <Navbar onCartClick={() => setSidebarOpen(true)} totalItems={totalItemsInCart} />
          <Container className='container' style={{ marginTop: '74px' }}>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Typography variant="h4" align="center" gutterBottom>
                      Bienvenido a Supercotito!
                    </Typography>
                    <Typography variant="h6" align="center" gutterBottom>
                      Productos destacados
                    </Typography>
                    <ProductCarousel products={products} />
                    <Box mt={4} display="flex" justifyContent="center">
                      <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/catalogo"
                      >
                        Ir al Catálogo
                      </Button>
                    </Box>
                  </>
                }
              />
              <Route
                path="/catalogo"
                element={<ProductList products={products} addToCart={addToCart} selectedCategory={selectedCategory} 
                onCategoryChange={handleCategoryChange} 
                priceOrder={priceOrder} 
                onPriceOrderChange={handlePriceOrderChange}  />}
                cart={cart} 
              />
              <Route
                path="/producto/:id"
                element={<ProductDetail products={products} addToCart={addToCart} />}
              />
              <Route
                path="/checkout"
                element={<Checkout cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} />}
              />
            </Routes>
            <CartSidebar
              open={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              cart={Object.values(cart)}
              clearCart={clearCart}
              removeFromCart={removeFromCart}
            />
          </Container>
          <Footer />
          <ToastContainer position="bottom-right" autoClose={1500} hideProgressBar={false} closeOnClick pauseOnHover draggable pauseOnFocusLoss />
        </>
      )}
    </Router>
  );
}

export default App;
