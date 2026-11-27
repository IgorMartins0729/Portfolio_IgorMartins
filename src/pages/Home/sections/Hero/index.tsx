import styles from './hero.module.css'
import logoGithub from '@/assets/github.png'
import logoLinkedin from '@/assets/linkedin.png'
import TechText from './components/TechText/TechText'

function Hero() {
  return (
    <section className={styles.main}>
      <div className={styles.heroContent}>
        <div className={styles.h1} style={{ width: '100%', height: '140px', position: 'relative' }}>
          <TechText
            text="Igor Martins"
            fontWeight={600}
            fontSize={120}
            reveal="letter"
            dashLength={4}
            dashGap={2}
            specks={15}
            intro="none"
            introDuration={2}
            clickKick
            guides={false}
            fontFamily=""
            letterSpacing={-0.05}
            accentColor="currentColor"
            reach={200}
            softness={0.7}
            lineStyle="dashed"
            strokeWidth={1.5}
            speed={1}
            bounce={0.4}
            selection
            labels
            color="currentColor"
            align="center"
            draggable
            sweep
          />
        </div>

        <div className={styles.below}>
        <p className={styles.subtitle}>FullStack Developer</p>

        <blockquote className={styles.quote}>
          &ldquo;Make it work, make it right, make it fast.&rdquo;
          <cite className={styles.quoteAuthor}>— Kent Beck</cite>
        </blockquote>

        <div className={styles.btnCV}>
          <a href="#projetos" className={`${styles.button} ${styles.buttonLight}`}>
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" width="22" height="22">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 12H19M19 12L13 6M19 12L13 18" />
            </svg>
            Ver Projetos
          </a>
          <a
            href={`${import.meta.env.BASE_URL}Curriculo_IgorMartins.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.button} ${styles.buttonDark}`}
          >
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" width="22" height="22">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12" />
            </svg>
            Baixar Currículo
          </a>
        </div>

        <div className={styles.containerImgSocial}>
          <a href="https://www.linkedin.com/in/igormrtns/" target="_blank" rel="noopener noreferrer">
            <img src={logoLinkedin} alt="LinkedIn de Igor Martins" />
          </a>
          <a href="https://github.com/IgorMartins0729" target="_blank" rel="noopener noreferrer">
            <img src={logoGithub} alt="GitHub de Igor Martins" />
          </a>
        </div>
        </div>
      </div>
    </section>
  )
}

export default Hero