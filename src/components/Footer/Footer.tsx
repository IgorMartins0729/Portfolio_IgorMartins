import { useEffect, useRef, useState } from 'react'
import { ArrowUp, Check, Copy, Mail, Phone } from 'lucide-react'
import styles from './Footer.module.css'
import logoGithub from '@/assets/github.png'
import logoLinkedin from '@/assets/linkedin.png'

const EMAIL = 'igor.mrt02@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/igormrtns/'
const GITHUB = 'https://github.com/IgorMartins0729'

const LINKS = [
  { label: 'Sobre mim', href: '#sobre-mim' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Formação', href: '#academico' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certificados', href: '#certificados' },
]

function Footer() {
  const [copia, setCopia] = useState<'idle' | 'ok' | 'erro'>('idle')
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copiarEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopia('ok')
    } catch {
      // sem permissão de clipboard (ex: http ou bloqueado pelo navegador)
      setCopia('erro')
    }
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopia('idle'), 2000)
  }
  const copiado = copia === 'ok'

  return (
    <footer className={styles.footer}>
      <section id="contato" className={styles.contact}>
        <div>
          <span className={styles.tag}>Contato</span>
          <h2 className={styles.title}>Vamos construir algo juntos?</h2>
          <p className={styles.text}>
            Estou aberto a oportunidades, projetos e boas conversas sobre tecnologia. Me chame por qualquer um destes
            canais, respondo o mais rápido possível.
          </p>
          <div className={styles.buttons}>
            <a href={`mailto:${EMAIL}`} className={`${styles.button} ${styles.buttonLight}`}>
              <Mail size={20} aria-hidden="true" />
              Enviar e-mail
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className={`${styles.button} ${styles.buttonDark}`}>
              Conectar no LinkedIn
            </a>
          </div>
        </div>

        <ul className={styles.channels}>
          <li className={styles.channel}>
            <span className={styles.icon}>
              <Mail size={20} aria-hidden="true" />
            </span>
            <div className={styles.channelInfo}>
              <span className={styles.channelLabel}>E-mail</span>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
            <button type="button" className={styles.copy} onClick={copiarEmail} aria-label="Copiar e-mail">
              {copiado ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
              <span className={styles.copyText} aria-live="polite">
                {copiado ? 'Copiado!' : copia === 'erro' ? 'Não foi possível copiar' : 'Copiar'}
              </span>
            </button>
          </li>
          <li className={styles.channel}>
            <span className={styles.icon}>
              <Phone size={20} aria-hidden="true" />
            </span>
            <div className={styles.channelInfo}>
              <span className={styles.channelLabel}>Telefone / WhatsApp</span>
              <a href="https://wa.me/5512988271988" target="_blank" rel="noopener noreferrer">
                (12) 98827-1988
              </a>
            </div>
          </li>
          <li className={styles.channel}>
            <span className={styles.icon}>
              <img src={logoLinkedin} alt="" />
            </span>
            <div className={styles.channelInfo}>
              <span className={styles.channelLabel}>LinkedIn</span>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                in/igormrtns
              </a>
            </div>
          </li>
          <li className={styles.channel}>
            <span className={styles.icon}>
              <img src={logoGithub} alt="" />
            </span>
            <div className={styles.channelInfo}>
              <span className={styles.channelLabel}>GitHub</span>
              <a href={GITHUB} target="_blank" rel="noopener noreferrer">
                IgorMartins0729
              </a>
            </div>
          </li>
        </ul>
      </section>

      <div className={styles.bottom}>
        <p className={styles.copyright}>© {new Date().getFullYear()} Igor Martins. Feito com React.</p>
        <nav aria-label="Rodapé">
          <ul className={styles.nav}>
            {LINKS.map(l => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#" className={styles.top}>
          Voltar ao topo
          <ArrowUp size={16} aria-hidden="true" />
        </a>
      </div>
    </footer>
  )
}

export default Footer
