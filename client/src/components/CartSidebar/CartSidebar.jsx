import { useState } from "react";
import styles from "./CartSidebar.module.css";
import PurchaseModal from "../PurchaseModal/PurchaseModal";
import { useCart } from "../../context/CartContext";

import {
  createOrder,
  addProductToOrder,
  confirmOrder,
} from "../../redux/feature/orders/ordersAPI";

export default function CartSidebar() {
  const { cart, removeFromCart, clearCart, itemCount } = useCart();

  const [showModal, setShowModal] = useState(false);
  const [purchaseTotal, setPurchaseTotal] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [purchaseError, setPurchaseError] = useState(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const simulatePayment = () =>
    new Promise((resolve) => setTimeout(() => resolve(true), 2000));

  const realizarCompra = async () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    setPurchaseTotal(total);
    setIsProcessing(true);
    setPurchaseError(null);
    setPurchaseSuccess(false);
    setShowModal(true);

    try {
      // Simular pago
      const paymentResult = await simulatePayment();
      if (!paymentResult) throw new Error("El pago fue rechazado");

      // 1. Crear orden sin token
      const createdOrder = await createOrder();

      if (!createdOrder?.id) throw new Error("No se pudo obtener el ID de la orden creada");

      // 2. Agregar productos uno a uno a la orden
      for (const item of cart) {
        await addProductToOrder(createdOrder.id, item.id, item.quantity);
      }

      // 3. Confirmar la orden
      await confirmOrder(createdOrder.id);

      setPurchaseSuccess(true);
      clearCart();
    } catch (error) {
      setPurchaseError(error.message || "Error al procesar la compra");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPurchaseSuccess(false);
    setPurchaseError(null);
    setIsProcessing(false);
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
            <button
              className="btn btn-danger btn-sm"
              onClick={clearCart}
              disabled={cart.length === 0 || isProcessing}
            >
              Vaciar
            </button>
            <button
              className="btn btn-success"
              onClick={realizarCompra}
              disabled={cart.length === 0 || isProcessing}
            >
              {isProcessing ? "Procesando..." : "Comprar"}
            </button>
          </div>
        </footer>
      </section>

      {showModal && (
        <PurchaseModal
          total={purchaseTotal}
          onClose={handleCloseModal}
          success={purchaseSuccess}
          error={purchaseError}
          processing={isProcessing}
        />
      )}
    </div>
  );
}
