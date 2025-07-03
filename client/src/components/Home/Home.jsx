import styles from './Home.module.css';

export default function Home() {
  return (
    <section className={styles.home}>
      <h1>Bienvenido a EasyStore</h1>
      <p>Encontrá productos increíbles con solo un clic.</p>
      <button onClick={() => window.location.href='#productos'}>
        Ver Productos
      </button>
    </section>
  );
}
