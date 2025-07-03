import { useState } from 'react';
import styles from './ProductCard.module.css';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ producto }) {
  const [agregado, setAgregado] = useState(false);
  const [verDescripcion, setVerDescripcion] = useState(false);
  const { addToCart } = useCart();

  const handleAgregar = () => {
    addToCart({
      id: producto.id,
      image: producto.image || producto.thumbnail,
      title: producto.title,
      price: producto.price,
    });

    setAgregado(true);
    setTimeout(() => setAgregado(false), 1000);
  };

  return (
    <>
      <div className={styles.card}>
        <img
          src={producto.image || producto.thumbnail}
          alt={producto.title}
          className={styles.cardImg}
        />
        <div>
          <h5 className={styles.cardTitle}>{producto.title}</h5>
          <p className={styles.shortDescription}>
            {producto.description.split(' ').slice(0, 5).join(' ')}...
          </p>
          <button
            className={styles.btnLink}
            onClick={() => setVerDescripcion(true)}
          >
            Ver descripción
          </button>
          <p className={styles.price}>${producto.price}</p>
          <button
            className={styles.btnPrimary}
            onClick={handleAgregar}
            disabled={agregado}
          >
            {agregado ? 'Agregado' : 'Agregar al carrito'}
          </button>
        </div>
      </div>

      {verDescripcion && (
        <div className={styles.modalOverlay} onClick={() => setVerDescripcion(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>{producto.title}</h3>
            <img
              src={producto.image || producto.thumbnail}
              alt={producto.title}
              className={styles.modalImg}
            />
            <p>{producto.description}</p>
            <p className={styles.modalPrice}><strong>Precio:</strong> ${producto.price}</p>
            <button
              className={styles.btnClose}
              onClick={() => setVerDescripcion(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
