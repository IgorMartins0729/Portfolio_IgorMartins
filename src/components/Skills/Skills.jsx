import React from 'react'
import styles from './Skills.module.css'
import { Network, Clock, BookOpen, Rocket, Compass } from 'lucide-react'

function Skills() {
  return (
    <section className={styles.main}>

      <h1 className={styles.pageTitle}>Minhas Habilidades</h1>

      <div className={styles.containerCard}>

        <div className={styles.card}>
          <h2 className={styles.titleCard}>Hard Skills</h2>
          <div className={styles.contentCardHard}>
            <div className={styles.itemHard}>
              <img className={styles.imgItemHard} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/960px-React-icon.svg.png" alt="" />
              <h3>React</h3>
            </div>
            <div className={styles.itemHard}>
              <img src="" alt="" />
              <h3>Python</h3>
            </div>
            <div className={styles.itemHard}>
              <img src="" alt="" />
              <h3>Typescript</h3>
            </div>
            <div className={styles.itemHard}>
              <img src="" alt="" />
              <h3>C#</h3>
            </div>
            
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.titleCard}>Soft Skills</h2>
          <div className={styles.contentCardSoft}>
            <div className={styles.itemSoft} >
              <Network /><h3>Trabalho em Equipe</h3>
            </div>
            <div className={styles.itemSoft}>
              <Clock /><h3>Gestão de Tempo</h3>
            </div>
            <div className={styles.itemSoft}>
              <Rocket /><h3>Proatividade</h3>
            </div>
            <div className={styles.itemSoft}>
              <Compass /><h3>Autonomia</h3>
            </div>
            <div className={styles.itemSoft}>
              <BookOpen /><h3>Aprendizado Contínuo</h3>
            </div>
            
          </div>
        </div>

      </div>

    </section>
  )
}

export default Skills