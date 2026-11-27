import { useState } from 'react'
import styles from './Projects.module.css'
import { getProjetos, getProjetosPorCategoria } from '@/services/dataService'
import { Categoria, type Project } from '@/types/project'
import ProjectModal from './ProjectModal'

const POR_PAGINA = 4

const FILTROS: { label: string; value: Categoria | 'todos' }[] = [
  { label: 'Todos', value: 'todos' },
  { label: 'Acadêmico', value: Categoria.Academico },
  { label: 'Pessoal', value: Categoria.Pessoal },
]

const NOME_CATEGORIA: Record<Categoria, string> = {
  [Categoria.Academico]: 'Acadêmico',
  [Categoria.Pessoal]: 'Pessoal',
}

const seta = (
  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" width="18" height="18">
    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 12H19M19 12L13 6M19 12L13 18" />
  </svg>
)

function Projects() {
  const [filtro, setFiltro] = useState<Categoria | 'todos'>('todos')
  const [visiveis, setVisiveis] = useState(POR_PAGINA)
  const [aberto, setAberto] = useState<Project | null>(null)
  const projetos = filtro === 'todos' ? getProjetos() : getProjetosPorCategoria(filtro)
  const temMais = projetos.length > visiveis

  return (
    <section id="projetos" className={styles.main}>
      <div className={styles.header}>
        <div>
          <span className={styles.tag}>Meus projetos</span>
          <h2 className={styles.title}>O que eu tenho construído.</h2>
          <div className={styles.filters} role="group" aria-label="Filtrar projetos">
            {FILTROS.map(f => (
              <button
                key={f.value}
                type="button"
                aria-pressed={filtro === f.value}
                className={styles.filter}
                onClick={() => {
                  setFiltro(f.value)
                  setVisiveis(POR_PAGINA)
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <a className={styles.seeAll} href="https://github.com/IgorMartins0729?tab=repositories" target="_blank" rel="noopener noreferrer">
          Ver todos os projetos
          {seta}
        </a>
      </div>

      <div className={`${styles.grid} ${temMais ? styles.faded : ''}`}>
        {projetos.slice(0, visiveis).map((projeto, i) => {
          const base = import.meta.env.BASE_URL
          const conteudo = (
            <>
              {projeto.capa2 ? (
                // capa1 (logo) e capa2 (print) empilhadas; o CSS alterna a opacidade em loop
                // delay por card: os cards não trocam todos ao mesmo tempo
                <span className={styles.covers}>
                  <img className={`${styles.image} ${styles.logoCover}`} src={`${base}${projeto.capa1}`} alt="" />
                  <img
                    className={`${styles.image} ${styles.printCover}`}
                    src={`${base}${projeto.capa2}`}
                    alt=""
                    style={{ animationDelay: `${-i * 1.5}s` }}
                  />
                </span>
              ) : (
                <img className={styles.image} src={`${base}${projeto.capa1}`} alt="" />
              )}
              {filtro === 'todos' && <span className={styles.badge}>{NOME_CATEGORIA[projeto.categoria]}</span>}
              {/* spans: botão só aceita conteúdo inline */}
              <span className={styles.overlay}>
                <span className={styles.cardTitle}>{projeto.titulo}</span>
                <span className={styles.more}>
                  <span className={styles.moreText}>Ver mais detalhes</span>
                  {seta}
                </span>
              </span>
            </>
          )
          return (
            <button
              key={projeto.id}
              type="button"
              className={styles.card}
              aria-haspopup="dialog"
              onClick={() => setAberto(projeto)}
            >
              {conteudo}
            </button>
          )
        })}
      </div>

      {/* key: cada projeto abre com a galeria na primeira imagem */}
      <ProjectModal
        key={aberto?.id}
        projeto={aberto}
        categoria={aberto ? NOME_CATEGORIA[aberto.categoria] : ''}
        onClose={() => setAberto(null)}
      />

      {temMais && (
        <div className={styles.loadMore}>
          <button type="button" onClick={() => setVisiveis(v => v + POR_PAGINA)}>
            Ver mais projetos
          </button>
        </div>
      )}

      {projetos.length === 0 && <p className={styles.empty}>Nenhum projeto nessa categoria ainda.</p>}
    </section>
  )
}

export default Projects
