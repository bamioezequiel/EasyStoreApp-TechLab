import { useState } from 'react';
import styles from './ProductCard.module.css';
import { useCart } from '../../context/CartContext';

const DEFAULT_IMAGE = 'https://placehold.co/300x200?text=Sin+Imagen';

export default function ProductCard({ product }) {
  const [added, setAdded] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAdd = () => {
    addToCart({
      id: product.id,
      image: product.imageUrl || DEFAULT_IMAGE,
      title: product.name,
      price: product.price,
      stock: product.stock
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  const handleImageError = (event) => {
    event.target.src = DEFAULT_IMAGE;
  };

  return (
    <>
      <div className={styles.card}>
        <img
          src={product.imageUrl || DEFAULT_IMAGE}
          alt={product.name}
          className={styles.cardImg}
          onError={handleImageError}
        />
        <div>
          <h5 className={styles.cardTitle}>{product.name}</h5>
          <p className={styles.shortDescription}>
            {product.description.split(' ').slice(0, 5).join(' ')}...
          </p>
          <button
            className={styles.btnLink}
            onClick={() => setShowDescription(true)}
          >
            Ver descripción
          </button>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          <button
            className={styles.btnPrimary}
            onClick={handleAdd}
            disabled={added}
          >
            {added ? 'Agregado' : 'Agregar al carrito'}
          </button>
        </div>
      </div>

      {showDescription && (
        <div className={styles.modalOverlay} onClick={() => setShowDescription(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>{product.name}</h3>
            <img
              src={product.imageUrl || DEFAULT_IMAGE}
              alt={product.name}
              className={styles.modalImg}
              onError={handleImageError}
            />
            <p>{product.description}</p>
            <p className={styles.modalPrice}><strong>Precio:</strong> ${product.price.toFixed(2)}</p>
            <p
              className={styles.stock}
              data-level={
                product.stock === 1
                  ? 'low'
                  : product.stock < 5
                  ? 'medium'
                  : 'high'
              }
            >
              {product.stock}
            </p>
            <button
              className={styles.btnClose}
              onClick={() => setShowDescription(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
