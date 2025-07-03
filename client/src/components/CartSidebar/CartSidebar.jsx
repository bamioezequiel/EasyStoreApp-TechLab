import { useState } from "react";
import styles from "./CartSidebar.module.css";
import PurchaseModal from "../PurchaseModal/PurchaseModal";
import { useCart } from "../../context/CartContext"; // Importa el contexto

export default function CartSidebar() {
  const { cart, removeFromCart, clearCart, itemCount } = useCart(); // Consume el contexto

  const [showModal, setShowModal] = useState(false);
  const [purchaseTotal, setPurchaseTotal] = useState(0);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const realizarCompra = () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }
    setPurchaseTotal(total);
    setShowModal(true);
    // No vaciar carrito aquí para no perder la info hasta que cierre el modal
  };

  const handleCloseModal = () => {
    setShowModal(false);
    clearCart(); // Vacía el carrito cuando se cierra el modal
  };

  return (
    <div className={styles.cartSidebar} role="region" aria-label="Carrito de compras">
      <header className={styles.cartHeader}>
        <h3>
          Carrito{" "}
          <span className={styles.cartCounter} aria-live="polite" aria-atomic="true">
            {itemCount}
          </span>
        </h3>
      </header>

      <section className={styles.cartContent}>
        <ul className={styles.cartItems} aria-live="polite" aria-relevant="all">
          {cart.length === 0 ? (
            <li className={styles.emptyCart}>Tu carrito está vacío</li>
          ) : (
            cart.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <img src={item.image} alt={item.title} className={styles.cartItemImg} />
                <div className={styles.cartItemDetails}>
                  <h6 className={styles.cartItemTitle}>{item.title}</h6>
                  <p className={styles.cartItemInfo}>
                    Cantidad: <strong>{item.quantity}</strong>
                  </p>
                  <p className={styles.cartItemInfo}>
                    Precio unitario: ${item.price.toFixed(2)}
                  </p>
                  <p className={styles.cartItemPrice}>
                    Subtotal: <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  </p>
                  <button className={styles.deleteBtn} onClick={() => removeFromCart(item.id)}>
                    Eliminar
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>

        <footer className={styles.cartFooter}>
          <div className={styles.cartTotal}>
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
          <div className={styles.cartActions}>
            <button className="btn btn-danger btn-sm" onClick={clearCart} disabled={cart.length === 0}>
              Vaciar
            </button>
            <button className="btn btn-success" onClick={realizarCompra} disabled={cart.length === 0}>
              Comprar
            </button>
          </div>
        </footer>
      </section>

      {showModal && <PurchaseModal total={purchaseTotal} onClose={handleCloseModal} />}
    </div>
  );
}
