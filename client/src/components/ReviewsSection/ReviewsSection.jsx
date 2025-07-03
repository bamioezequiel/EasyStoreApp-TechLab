import styles from './ReviewsSection.module.css';

const reviews = [
  {
    id: 1,
    name: "Ramona Rodríguez",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    comment:
      "¡Excelente experiencia de compra! El producto llegó rapidísimo y en perfecto estado. La atención al cliente fue muy cordial. Sin dudas voy a volver a comprar.",
  },
  {
    id: 2,
    name: "Martín Gómez",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    comment:
      "Los precios son súper competitivos y la calidad me sorprendió. La descripción era precisa y el pago fue seguro. Muy recomendable.",
  },
  {
    id: 3,
    name: "Carla Méndez",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    comment:
      "Me encantó la web, todo está bien organizado y es fácil encontrar lo que buscás. Ya hice dos compras y ambas llegaron antes de lo previsto.",
  },
];

export default function ReviewsSection() {
  return (
    <section id="reseñas" className={styles.reviews}>
      <h2 className={styles.title}>Reseñas</h2>
      <div className={styles.row}>
        {reviews.map(({ id, name, image, comment }) => (
          <div key={id} className={`${styles.col} ${styles['col-md-4']}`}>
            <div className={styles.card}>
              <img src={image} alt={`Cliente ${name}`} className={styles.cardImgTop} />
              <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}>{name}</h5>
                <p className={styles.cardText}>{comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
