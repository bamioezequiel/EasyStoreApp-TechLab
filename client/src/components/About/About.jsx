import styles from './About.module.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function About() {
  return (
    <section className={styles.about}>
      <h3>App creada por <span className={styles.author}>Ezequiel Bamio</span></h3>
      <p>Desarrollador Backend con experiencia en Java, Spring Boot y MERN Stack. Apasionado por crear soluciones eficientes y bien estructuradas.</p>
      <div className={styles.socialLinks}>
        <a href="https://bamio.vercel.app/" target="_blank" rel="noopener noreferrer">
          Portafolio
        </a>
        <a href="https://www.linkedin.com/in/ezequielbamio/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin /> LinkedIn
        </a>
        <a href="https://github.com/bamioezequiel" target="_blank" rel="noopener noreferrer">
          <FaGithub /> GitHub
        </a>
      </div>
    </section>
  );
}
