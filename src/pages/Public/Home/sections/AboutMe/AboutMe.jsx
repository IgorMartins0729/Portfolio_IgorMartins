import React from 'react'
import styles from './AboutMe.module.css'

const arrayExperienciaProfissional = [
  { id: 1, nomeEmpresa: "Kaffa Tech", cargo: "Estagiário de Desenvolvimento de Software", periodo: "Dez 2025 - Atual" },
  { id: 2, nomeEmpresa: "Sonaca Brasil", cargo: "Auxiliar de TI", periodo: "Mar 2024 - Jun 2025" }
]

function AboutMe() {
  return (
    <section className={styles.main}>
      <h1 className={styles.pageTitle}>Sobre mim e Experiência Profissional</h1>

      <div className={styles.container}>
        <div className={styles.containerContent}>
          <h2 className={styles.sectionTitle}>Meus Objetivos</h2>
          <div className={styles.textArea}>
            <p className={styles.description}>Meu nome é Igor e sou estudante na área de tecnologia, com interesse em desenvolvimento.
              Tenho experiência com linguagens de programação, versionamento com Git e criação de interfaces
              focadas em usabilidade e experiência do usuário. Busco sempre aprimorar minhas habilidades
              por meio de projetos acadêmicos e aplicando na prática o que aprendo durante minha formação
              na FATEC São José dos Campos.
            </p>
          </div>
        </div>

        <div className={styles.containerContent}>
          <h2 className={styles.sectionTitle}>Experiência Profissional</h2>
          <div className={styles.content}>
            {arrayExperienciaProfissional.map(experiencias => (
              <article key={experiencias.id} className={styles.experienceItem}>
                <h3 className={styles.companyName}>{experiencias.nomeEmpresa}</h3>
                <p className={styles.role}>{experiencias.cargo}</p>
                <time className={styles.period}>{experiencias.periodo}</time>
              </article>
            ))}
          </div>

        </div>

      </div>

    </section>
  )
}

export default AboutMe