import React from 'react'
import styles from './Footer.module.css'
import logoGithub from "../../assets/github.png"
import logoLinkedin from "../../assets/linkedin.png"

function Footer() {
  return (
    <section id="contato" className={styles.main}>
      <div className={styles.containerFooter}>

        <div className={styles.leftGroup}>
          <h2>Obrigado pela Visita!</h2>
          <div className={styles.imgGroup}>
            <a href="https://github.com/IgorMartins0729" target="_blank" rel="noopener noreferrer">
              <img src={logoGithub} alt="GitHub de Igor Martins" />
            </a>
            <a href="https://www.linkedin.com/in/igormrtns/" target="_blank" rel="noopener noreferrer">
              <img src={logoLinkedin} alt="LinkedIn de Igor Martins" />
            </a>
          </div>
          <div className={styles.btnGroup}>
            <a href="https://www.linkedin.com/in/igormrtns/" target="_blank" rel="noopener noreferrer">
              <button>Vamos conectar!</button>
            </a>
          </div>
        </div>

        <div className={styles.rightGroup}>
          <div className={styles.menuGroup}>
            <h3>Menu</h3>
            <nav className={styles.navMenu}>
              <ul>
                <li><a href="#sobre-mim">Sobre Mim</a></li>
                <li><a href="#academico">Formação Acadêmica</a></li>
                <li><a href="#projetos">Projetos</a></li>
              </ul>

              <ul>
                <li><a href="#skills">Hard & Soft Skills</a></li>
                <li><a href="#certificados">Certificados</a></li>
                <li><a href="#contato">Contato</a></li>
              </ul>
            </nav>
          </div>

          <div>
            <h3>Contato</h3>
            <ul>
              <li><a href="tel:+5512988271988">(12) 98827-1988</a></li>
              <li><a href="mailto:igor.mrt02@gmail.com">igor.mrt02@gmail.com</a></li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Footer
