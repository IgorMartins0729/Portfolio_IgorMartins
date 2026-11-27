import styles from './aboutme.module.css'
import fotoIgor from '@/assets/igor.jpg'

function AboutMe() {
  return (
    <section id="sobre-mim"className={styles.main}>
      <div className={styles.text}>
        <span className={styles.tag}>Sobre mim</span>
        <h2 className={styles.title}>Transformo ideias em código que funciona.</h2>
        <p className={styles.description}>
          Sou Igor Martins, desenvolvedor FullStack e estudante da FATEC São José dos Campos. Gosto de entender o
          problema antes de escrever a primeira linha, e de construir aplicações que sejam simples de usar e de manter,
          do banco de dados até a interface.
        </p>
        <p className={styles.description}>
          No dia a dia trabalho com desenvolvimento web, versionamento com Git e integração entre front-end e back-end.
          Sigo aprendendo com projetos acadêmicos e profissionais, sempre buscando escrever código mais limpo e entregar
          experiências melhores para quem usa.
        </p>
      </div>

      <div className={styles.photoWrapper}>
        <img className={styles.photo} src={fotoIgor} alt="Foto de Igor Martins" />
      </div>
    </section>
  )
}

export default AboutMe
