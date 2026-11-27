import { useState } from 'react'
import BaseModal from '@/components/BaseModal/BaseModal'
import type { Project } from '@/types/project'
import styles from './ProjectModal.module.css'

const base = import.meta.env.BASE_URL

type Midia = { tipo: 'imagem' | 'video'; src: string }

// "https://youtu.be/ID" ou ".../watch?v=ID" -> embed; null se não for YouTube
function youtubeEmbed(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/)
  return m ? `https://www.youtube-nocookie.com/embed/${m[1]}` : null
}

// caminho relativo = arquivo em public/; http(s) = URL externa
const resolver = (src: string) => (/^https?:\/\//.test(src) ? src : `${base}${src}`)

// vídeo sempre primeiro (abre no vídeo), depois print e imagens extras
function midiasDo(projeto: Project): Midia[] {
  const imagens = [projeto.capa2 ?? projeto.capa1, ...(projeto.imagens ?? [])]
  const midias: Midia[] = imagens.map(src => ({ tipo: 'imagem', src }))
  if (projeto.video) midias.unshift({ tipo: 'video', src: projeto.video })
  return midias
}

function Visualizador({ midia, titulo }: { midia: Midia; titulo: string }) {
  if (midia.tipo === 'imagem') {
    return <img className={styles.mainMedia} src={resolver(midia.src)} alt={`Tela do projeto ${titulo}`} />
  }
  const embed = youtubeEmbed(midia.src)
  return embed ? (
    <iframe
      className={styles.mainMedia}
      src={embed}
      title={`Vídeo do projeto ${titulo}`}
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  ) : (
    <video className={styles.mainMedia} src={resolver(midia.src)} controls />
  )
}

interface Props {
  projeto: Project | null
  categoria: string
  onClose: () => void
}

function ProjectModal({ projeto, categoria, onClose }: Props) {
  const [ativa, setAtiva] = useState(0)

  if (!projeto) return null
  const midias = midiasDo(projeto)
  const atual = midias[Math.min(ativa, midias.length - 1)]

  return (
    <BaseModal isOpen onClose={onClose} title={projeto.titulo} className={styles.modal}>
      <div className={styles.layout}>
        {/* esquerda: mídia + resumo rápido (tecnologias e link); direita: os textos */}
        <div className={styles.gallery}>
          <div className={`${styles.viewer} ${atual.tipo === 'video' ? styles.viewerVideo : ''}`}>
            <Visualizador midia={atual} titulo={projeto.titulo} />
          </div>

          {midias.length > 1 && (
            <div className={styles.thumbs} role="tablist" aria-label="Imagens e vídeos do projeto">
              {midias.map((m, i) => (
                <button
                  key={m.src}
                  type="button"
                  role="tab"
                  aria-selected={i === ativa}
                  aria-label={m.tipo === 'video' ? 'Vídeo' : `Imagem ${i + 1}`}
                  className={styles.thumb}
                  onClick={() => setAtiva(i)}
                >
                  {m.tipo === 'imagem' ? (
                    <img src={resolver(m.src)} alt="" />
                  ) : (
                    <span className={styles.play}>
                      <span aria-hidden="true">▶</span> Vídeo
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          <div className={styles.summary}>
            <div className={styles.summaryTop}>
              <span className={styles.badge}>{categoria}</span>
              {projeto.link && (
                <a className={styles.repo} href={projeto.link} target="_blank" rel="noopener noreferrer">
                  Ver repositório
                  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" width="16" height="16">
                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7V16" />
                  </svg>
                </a>
              )}
            </div>

            {projeto.tecnologias.length > 0 && (
              <>
                <h3 className={styles.label}>Tecnologias</h3>
                <div className={styles.techs}>
                  {projeto.tecnologias.map(t => (
                    <span key={t} className={styles.tech}>
                      {t}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className={styles.info}>
          <section className={styles.block}>
            <h3 className={styles.label}>Sobre o projeto</h3>
            <p className={styles.text}>{projeto.descricao}</p>
          </section>

          <section className={styles.block}>
            <h3 className={styles.label}>Objetivo</h3>
            <p className={styles.text}>{projeto.objetivo}</p>
          </section>

          {projeto.minhaColaboracao && (
            <section className={styles.block}>
              <h3 className={styles.label}>Minha colaboração</h3>
              <p className={styles.text}>{projeto.minhaColaboracao}</p>
            </section>
          )}
        </div>
      </div>
    </BaseModal>
  )
}

export default ProjectModal
