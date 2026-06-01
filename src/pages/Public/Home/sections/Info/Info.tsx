import styles from './Info.module.css'
import fotoIgor from "../../../../../assets/igor.jpg"
import logoGithub from "../../../../../assets/github.png"
import logoLinkedin from "../../../../../assets/linkedin.png"

function Info() {
  return (
    <section className={styles.main}>

      <div className={styles.containerImgMain}>
        <img src={fotoIgor} alt="Foto de Igor Martins" />
      </div>

      <h1 className={styles.h1}>Igor Martins</h1>

      <div className={styles.containerImgSocial}>
        <a href="https://www.linkedin.com/in/igormrtns/" target="_blank" rel="noopener noreferrer">
          <img src={logoLinkedin} alt="LinkedIn de Igor Martins" />
        </a>
        <a href="https://github.com/IgorMartins0729" target="_blank" rel="noopener noreferrer">
          <img src={logoGithub} alt="GitHub de Igor Martins" />
        </a>
      </div>

      <div className={styles.btnCV}>
        <a href={`${import.meta.env.BASE_URL}Curriculo_IgorMartins.pdf`} target="_blank" rel="noopener noreferrer">
          <button className={styles.button}>Baixar Currículo</button>
        </a>
      </div>

    </section>
  )
}

export default Info
