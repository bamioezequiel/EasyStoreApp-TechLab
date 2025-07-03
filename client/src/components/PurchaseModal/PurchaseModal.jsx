import styles from './PurchaseModal.module.css';

export default function PurchaseModal({ total, onClose }) {
  console.log(total)

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>¡Gracias por tu compra!</h2>
        <p>El total pagado fue: <strong>${total}</strong></p>
        <button className={styles.btnClose} onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
