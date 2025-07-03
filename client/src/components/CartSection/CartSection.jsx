// CartSection.jsx (layout general)
import CartSidebar from '../CartSidebar/CartSidebar';
import styles from './CartSection.module.css';

export default function CartSection() {
  return (
    <section className={styles.cartSection}>
      <div className={styles.cartContainer}>
        <h1 className={styles.cartTitle}>Tu Carrito</h1>
        <CartSidebar />
      </div>
    </section>
  );
}
