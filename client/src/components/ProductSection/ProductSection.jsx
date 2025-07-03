import { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductSection.module.css';

export default function ProductSection() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => {
        if (!res.ok) throw new Error('API DummyJSON no disponible');
        return res.json();
      })
      .then(data => {
        if (data.products) setProductos(data.products.slice(0, 7));
      })
      .catch(err => console.error('Error al obtener productos', err));
  }, []);

  return (
    <section id="productos" className={`container my-5 ${styles.productSection}`}>
      <h2 className={styles.title}>Productos</h2>
      <div className={styles.productosContainer}>
        {productos.map(prod => (
          <ProductCard key={prod.id} producto={prod} />
        ))}
      </div>
    </section>
  );
}
