import styles from './PurchaseModal.module.css';

export default function PurchaseModal({ total, onClose, processing, success, error }) {
  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>
          {processing
            ? 'Procesando pago...'
            : success
            ? '¡Gracias por tu compra!'
            : error
            ? 'Error en la compra'
            : 'Estado desconocido'}
        </h2>

        {!processing && success && (
          <p>El total pagado fue: <strong>${total.toFixed(2)}</strong></p>
        )}

        {!processing && error && (
          <p style={{ color: 'red' }}>Hubo un problema: {error}</p>
        )}

        <button className={styles.btnClose} onClick={onClose} disabled={processing}>
          {processing ? 'Espere...' : 'Cerrar'}
        </button>
      </div>
    </div>
  );
}
