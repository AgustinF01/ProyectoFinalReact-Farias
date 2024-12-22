# Supercotito - Proyecto de E-commerce

Supercotito es una aplicación de comercio electrónico desarrollada con React y Vite, que permite a los usuarios navegar por un catálogo de productos, agregar artículos a un carrito de compras y realizar el proceso de checkout. La aplicación está diseñada para ser intuitiva y fácil de usar, ofreciendo una experiencia de compra fluida.

# Composición del Proyecto
El proyecto está estructurado de la siguiente manera:

- **Componentes**: La aplicación está dividida en varios componentes reutilizables, como Navbar, Footer, ProductList, ProductDetail, CartSidebar, y más, que manejan diferentes partes de la interfaz de usuario.

- **Rutas**: Utiliza react-router-dom para gestionar la navegación entre diferentes vistas, como el catálogo de productos, detalles del producto y el proceso de checkout.

- **Estado Global**: Se utiliza el estado local de React para manejar el carrito de compras y la selección de productos.

# Librerías Utilizadas

El proyecto hace uso de varias librerías para facilitar el desarrollo y mejorar la experiencia del usuario:
# Supercotito - Proyecto de E-commerce

Supercotito es una aplicación de comercio electrónico desarrollada con React y Vite, que permite a los usuarios navegar por un catálogo de productos, agregar artículos a un carrito de compras y realizar el proceso de checkout. La aplicación está diseñada para ser intuitiva y fácil de usar, ofreciendo una experiencia de compra fluida.

# Composición del Proyecto
El proyecto está estructurado de la siguiente manera:

- **Componentes**: La aplicación está dividida en varios componentes reutilizables, como Navbar, Footer, ProductList, ProductDetail, CartSidebar, y más, que manejan diferentes partes de la interfaz de usuario.

- **Rutas**: Utiliza react-router-dom para gestionar la navegación entre diferentes vistas, como el catálogo de productos, detalles del producto y el proceso de checkout.

- **Estado Global**: Se utiliza el estado local de React para manejar el carrito de compras y la selección de productos.

# Librerías Utilizadas

El proyecto hace uso de varias librerías para facilitar el desarrollo y mejorar la experiencia del usuario:

- **React**: Biblioteca principal para construir la interfaz de usuario.

- **Vite**: Herramienta de construcción y desarrollo que permite un arranque rápido y recarga en caliente.

- **Material-UI**: Biblioteca de componentes de interfaz de usuario que proporciona un diseño moderno y responsivo.

- **Firebase**: Utilizado para la gestión de datos en tiempo real y almacenamiento de productos.

- **react-router-dom**: Para la gestión de rutas y navegación en la aplicación.

- **react-toastify**: Para mostrar notificaciones de éxito y error al usuario.

- **jspdf**: Para generar y descargar tickets de compra en formato PDF.

- **react-slick**: Para implementar un carrusel de productos destacados.

# Funcionamiento
- **Navegación**: Los usuarios pueden navegar por el catálogo de productos y ver detalles de cada uno.

- **Agregar al Carrito**: Los productos se pueden agregar al carrito de compras, donde se puede ver el total y la cantidad de artículos.

- **Checkout**: Al finalizar la compra, los usuarios completan un formulario con su información y pueden descargar un ticket de compra en PDF.

- **Persistencia**: El carrito de compras se guarda en el almacenamiento local del navegador, permitiendo que los usuarios mantengan su selección incluso si recargan la página.
- **Stock**: No permite al usuario añadir mas productos al carrito de los que hay disponibles y cuando estos se agotan, se actualiza el estado para que no permita añadir mas de dicho producto actualizando asi la base de datos con cada compra.
