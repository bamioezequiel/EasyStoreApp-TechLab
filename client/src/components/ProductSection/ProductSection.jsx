import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductSection.module.css';
import { fetchProducts } from '../../redux/feature/products/productsSlice';

export default function ProductSection() {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
console.log(productos);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <p>Cargando productos...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <section id="productos" className={`container my-5 ${styles.productSection}`}>
      <h2 className={styles.title}>Productos</h2>
      <div className={styles.productosContainer}>
        {productos.map(prod => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
}
