import React, { useState, useEffect } from 'react'
import styles from './Projects.module.css'
import modalStyles from '../../../../../components/BaseModal/BaseModal.module.css'
import {
  getProjetos,
  adicionarProjeto,
  editarProjeto,
  excluirProjeto
} from '../../../../../services/projetoService'
import BaseModal from '../../../../../components/BaseModal/BaseModal'

  return (
    <section id="projetos" className={styles.main}>
      <h1 className={styles.pageTitle}>Meus Projetos</h1>

      <div className={styles.containerCard}>
        {projetos.map(projeto => (
          <div key={projeto.id} className={styles.card}>
            {projeto.imagem && <img className={styles.imgCard} src={projeto.imagem} alt={projeto.titulo} />}
            <h2>{projeto.titulo}</h2>
            <p>{projeto.descricao}</p>
            <div className={styles.tagsTech}>
              <span className={styles.tags}>{projeto.tecnologias}</span>
            </div>
            <div className={styles.btnCard}>
              {projeto.link ? (
                <a href={projeto.link} target="_blank" rel="noopener noreferrer">
                  <button type="button">Ver repositório</button>
                </a>
              ) : (
                <button type="button" disabled>Ver repositório</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
