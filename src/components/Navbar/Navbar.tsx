import styles from './Navbar.module.css'

function Navbar() {
  return (
    <>
    <header>
        <nav className={styles.nav}>
            <h1 className={styles.h1}>Portfólio</h1>
        
        <ul className={styles.ul}>
            <li>
              <a className={styles.a} href="#sobre-mim">Sobre mim</a>
            </li>

            <li>
              <a className={styles.a} href="#academico">Formação Acadêmica</a>
            </li>

            <li>
              <a className={styles.a} href="#projetos">Projetos</a>
            </li>

            <li>
              <a className={styles.a} href="#skills">Hard & Soft Skills</a>
            </li>

            <li>
              <a className={styles.a} href="#certificados">Certificados</a>
            </li>

            <li>
              <a className={styles.a} href="#contato">Contato</a>
            </li>

        </ul>
        </nav>
    </header>
    </>
  )
}

export default Navbar