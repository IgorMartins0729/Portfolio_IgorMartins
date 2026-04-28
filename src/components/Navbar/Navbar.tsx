import styles from './Navbar.module.css'

function Navbar() {
  return (
    <>
    <header>
        <nav className={styles.nav}>
            <h1 className={styles.h1}>Portfólio</h1>
        
        <ul className={styles.ul}>
            <li>
              <a className={styles.a} href="">Sobre mim</a>
            </li>

            <li>
              <a className={styles.a} href="">Formação Acadêmica</a>
            </li>

            <li>
              <a className={styles.a} href="">Projetos</a>
            </li>

            <li>
              <a className={styles.a} href="">Hard & Soft Skills</a>
            </li>

            <li>
              <a className={styles.a} href="">Certificados</a>
            </li>

            <li>
              <a className={styles.a} href="">Contato</a>
            </li>

        </ul>
        </nav>
    </header>
    </>
  )
}

export default Navbar