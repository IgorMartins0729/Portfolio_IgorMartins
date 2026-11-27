import { useState } from 'react'
import styles from './Certificates.module.css'
import BaseModal from '@/components/BaseModal/BaseModal'
import { getCertificados } from '@/services/dataService'
import type { Certificate } from '@/types/certificate'

const POR_PAGINA = 6
const base = import.meta.env.BASE_URL

function Certificates() {
  const certificados = getCertificados()
  const [visiveis, setVisiveis] = useState(POR_PAGINA)
  const [aberto, setAberto] = useState<Certificate | null>(null)
  const temMais = certificados.length > visiveis

  return (
    <section id="certificados" className={styles.main}>
      <div className={styles.header}>
        <div>
          <span className={styles.tag}>Certificados</span>
          <h2 className={styles.title}>Aprendizado contínuo.</h2>
        </div>
        <p className={styles.count}>
          <strong>{certificados.length}</strong> {certificados.length === 1 ? 'certificado' : 'certificados'}
        </p>
      </div>

      <div className={`${styles.grid} ${temMais ? styles.faded : ''}`}>
        {certificados.slice(0, visiveis).map(cert => (
          <button key={cert.id} type="button" className={styles.card} onClick={() => setAberto(cert)}>
            {/* spans: botão só aceita conteúdo inline */}
            <span className={`${styles.imageWrap} ${cert.badge ? styles.badgeWrap : ''}`}>
              <img className={styles.image} src={`${base}${cert.imagem}`} alt="" loading="lazy" />
              {cert.badge && <span className={styles.badgeTag}>Badge digital</span>}
              <span className={styles.zoom}>Ampliar</span>
            </span>
            <span className={styles.info}>
              <span className={styles.cardTitle}>{cert.titulo}</span>
              <span className={styles.institution}>{cert.instituicao}</span>
              <span className={styles.meta}>
                {[cert.dataEmissao, cert.cargaHoraria].filter(Boolean).join(' · ')}
              </span>
            </span>
          </button>
        ))}
      </div>

      {temMais && (
        <div className={styles.loadMore}>
          <button type="button" onClick={() => setVisiveis(v => v + POR_PAGINA)}>
            Ver mais certificados
          </button>
        </div>
      )}

      {certificados.length === 0 && <p className={styles.empty}>Nenhum certificado cadastrado ainda.</p>}

      <BaseModal isOpen={aberto !== null} onClose={() => setAberto(null)} title={aberto?.titulo ?? ''} className={styles.modal}>
        {aberto && (
          <>
            <img
              className={`${styles.modalImage} ${aberto.badge ? styles.modalBadge : ''}`}
              src={`${base}${aberto.imagem}`}
              alt={`Certificado: ${aberto.titulo}`}
            />
            <div className={styles.modalFooter}>
              <span className={styles.institution}>
                {[aberto.instituicao, aberto.dataEmissao, aberto.cargaHoraria].filter(Boolean).join(' · ')}
              </span>
              {aberto.pdf && (
                <a className={styles.pdf} href={`${base}${aberto.pdf}`} target="_blank" rel="noopener noreferrer">
                  Abrir PDF
                </a>
              )}
            </div>
            {aberto.competencias && aberto.competencias.length > 0 && (
              <>
                <h3 className={styles.competenciasLabel}>Competências</h3>
                <ul className={styles.competencias}>
                  {aberto.competencias.map(c => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </BaseModal>
    </section>
  )
}

export default Certificates
