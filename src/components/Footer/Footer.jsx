import React from 'react'
import styles from './Footer.module.css'
import logoGithub from "../../assets/github.png"
import logoLinkedin from "../../assets/linkedin.png"

function Footer() {
  return (
    <section className={styles.main}>
      <div className={styles.containerFooter}>

        <div className={styles.leftGroup}>
          <h2>Obrigado pela Visita!</h2>
          <div className={styles.imgGroup}>
            <img src={logoGithub} alt="" />
            <img src={logoLinkedin} alt="" />
          </div>
          <div className={styles.btnGroup}>
            <button>Vamos conectar!</button>
          </div>
        </div>

        <div className={styles.rightGroup}>
          <div className={styles.menuGroup}>
            <h3>Menu</h3>
            <nav className={styles.navMenu}>
              <ul>
                <li><a href="">Sobre Mim</a></li>
                <li><a href="">Formação Acadêmica</a></li>
                <li><a href="">Projetos</a></li>
              </ul>

              <ul>
                <li><a href="">Hard & Soft Skills</a></li>
                <li><a href="">Certificados</a></li>
                <li><a href="">Contato</a></li>
              </ul>

            </nav>
          </div>

          <div>
            <h3>Contato</h3>
            <ul>
              <li><a href="">(12) 98827-1988</a></li>
              <li><a href="">igor.mrt02@gmail.com</a></li>
            </ul>
          </div>

        </div>



      </div>
    </section>
  )
}

export default Footer