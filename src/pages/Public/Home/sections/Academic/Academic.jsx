import React from 'react'
import styles from './Academic.module.css'
import iconStudy from '../../../../../assets/Group2.svg'
import iconLoading from '../../../../../assets/Vector3.svg'
import iconCheck from '../../../../../assets/4.svg'

const arrayCursos = [
  { id: 1, curso: "Desenvolvimento de Software Multiplataforma", instituicao: "FATEC São José dos Campos", periodo: "Início: 08/2025 - Previsão: 07/2028", icone: iconLoading },
  { id: 2, curso: "Técnico de Informática", instituicao: "Colégio Joseense", periodo: "Início: 02/2020 - Conclusão: 12/2022", icone: iconCheck }
]

function Academic() {
  return (
    <section className={styles.main}>
      <h1 className={styles.pageTitle}>Formação Acadêmica</h1>

      <div className={styles.containerCard}>
        {arrayCursos.map(cursos => (
          <div key={cursos.id} className={styles.card}>

            <div className={styles.leftCard}>
              <img className={styles.firstIcon} src={iconStudy} alt="" />
            <img className={styles.secondIcon} src={cursos.icone} alt="" />
            </div>

            <div className={styles.rightCard}>
              <h2 className={styles.nameCourse}>{cursos.curso}</h2>
              <p className={styles.localCourse}>{cursos.instituicao}</p>
              <p className={styles.periodCourse}>{cursos.periodo}</p>
            </div>
            
          </div>
        ))}

      </div>

    </section>
  )
}

export default Academic