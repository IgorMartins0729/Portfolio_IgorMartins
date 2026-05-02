import React from 'react'
import styles from './Certificates.module.css'

function Certificates() {
  return (
    <section className={styles.main}>
        <h1 className={styles.pageTitle}>Meus Certificados</h1>

        
        <div className={styles.containerCard}>
          <div className={styles.card}>
            <h3>aaa</h3>
            <p>ss</p>
            <p>ss</p>
          </div>
        </div>

        <a href="">Adicionar novo certifiicado</a>
        <a href="">Editar Certificado</a>
        <a href="">Excluir Certificado</a>

    </section>
  )
}

export default Certificates