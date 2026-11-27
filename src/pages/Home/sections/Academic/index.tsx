import React, { useState, useEffect } from 'react'
import styles from './Academic.module.css'
import modalStyles from '../../../../../components/BaseModal/BaseModal.module.css'
import iconStudy from '../../../../../assets/Group2.svg'
import iconLoading from '../../../../../assets/Vector3.svg'
import iconCheck from '../../../../../assets/4.svg'
import {
  getCursos,
  adicionarCurso,
  editarCurso,
  excluirCurso
} from '../../../../../services/cursoService'
import BaseModal from '../../../../../components/BaseModal/BaseModal'

  return (
    <section id="academico" className={styles.main}>
      <h1 className={styles.pageTitle}>Formação Acadêmica</h1>

      <div className={styles.containerCard}>
        {meusCursos.map(curso => (
          <div key={curso.id} className={styles.card}>
            <div className={styles.leftCard}>
              <img className={styles.firstIcon} src={iconStudy} alt="Ícone de formação" />
              <img className={styles.secondIcon} src={curso.isCompleted ? iconCheck : iconLoading} alt={curso.isCompleted ? 'Concluído' : 'Em andamento'} />
            </div>
            <div className={styles.rightCard}>
              <h2 className={styles.nameCourse}>{curso.nomeCurso}</h2>
              <p className={styles.localCourse}>{curso.localCurso}</p>
              <p className={styles.periodCourse}>Início: {curso.inicioCurso} - Fim: {curso.fimCurso}</p>
            </div>
          </div>
        ))}

    </section>
  )
}

export default Academic
