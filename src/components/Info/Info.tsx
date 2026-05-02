import styles from './Info.module.css'
import fotoIgor from "../../assets/igor.jpg"
import logoGithub from "../../assets/github.png"
import logoLinkedin from "../../assets/linkedin.png"

function Info() {
  return (
    <section className={styles.main}>


      <div className={styles.containerImgMain}>
          <img src={fotoIgor} alt="" />
      </div>
      
      <h1 className={styles.h1}>Igor Martins</h1>

      <div className={styles.containerImgSocial}>
        <a href="https://www.linkedin.com/in/igormrtns/"><img src={logoLinkedin} alt="" /></a>
        <a href="https://github.com/IgorMartins0729"><img src={logoGithub} alt="" /></a>
      </div>  

      <div className={styles.btnCV}> 
        <a href="/Curriculo_IgorMartins.pdf" target="_blank">     
        <button className={styles.button}>Baixar Currículo</button>
        </a>
      </div>


    </section>
  )
}

export default Info