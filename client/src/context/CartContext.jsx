import { createContext, useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(item => item.id === product.id);

      if (existingIndex !== -1) {
        const newCart = [...prevCart];
        const currentQuantity = newCart[existingIndex].quantity;

        if (currentQuantity + 1 > product.stock) {
          Swal.fire({
            icon: 'error',
            title: 'Stock insuficiente',
            text: 'No hay stock suficiente para este producto.',
            timer: 2500,
            showConfirmButton: false,
            position: 'top-end',
            toast: true,
          });
          return prevCart;
        }

        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: currentQuantity + 1,
        };
        return newCart;
      } else {
        if (product.stock < 1) {
          Swal.fire({
            icon: 'error',
            title: 'Sin stock',
            text: 'Producto sin stock disponible.',
            timer: 2500,
            showConfirmButton: false,
            position: 'top-end',
            toast: true,
          });
          return prevCart;
        }
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, removeFromCart, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
