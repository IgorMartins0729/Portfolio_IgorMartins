import { useState } from 'react'
import styles from './Academic.module.css'
import { getFormacao } from '@/services/dataService'
import type { Education } from '@/types/education'
import { mesAtual, paraMeses } from '@/utils/periodo'

// % do curso já percorrido, pelo calendário; null se as datas não baterem com o formato "Mmm AAAA"
function progresso(f: Education): number | null {
  const inicio = paraMeses(f.inicioPeriodo)
  const fim = f.fimPeriodo ? paraMeses(f.fimPeriodo) : null
  if (inicio === null || fim === null || fim <= inicio) return null
  const pct = ((mesAtual() - inicio + 1) / (fim - inicio + 1)) * 100
  return Math.round(Math.min(100, Math.max(0, pct)))
}

// sem fim = cursando; fim em formato inválido = tratado como concluído
const cursando = (f: Education) => {
  if (!f.fimPeriodo) return true
  const fim = paraMeses(f.fimPeriodo)
  return fim !== null && fim >= mesAtual()
}

// quantas disciplinas aparecem antes do "Ver todas"
const PRINCIPAIS = 8

function Academic() {
  const [todas, setTodas] = useState(false)
  const formacoes = getFormacao()
  const destaque = formacoes.find(cursando) ?? formacoes[0]
  const outras = formacoes.filter(f => f !== destaque)
  const pct = destaque ? progresso(destaque) : null

  return (
    <section id="academico" className={styles.main}>
      <span className={styles.tag}>Formação acadêmica</span>
      <h2 className={styles.title}>Onde aprendi a base.</h2>

      {destaque && (
        <div className={styles.layout}>
          <article className={styles.featured}>
            <div className={styles.featuredTop}>
              {destaque.grau && <span className={styles.degree}>{destaque.grau}</span>}
              <span className={cursando(destaque) ? styles.statusOn : styles.statusDone}>
                {cursando(destaque) ? 'Cursando' : 'Concluído'}
              </span>
            </div>

            <h3 className={styles.course}>{destaque.curso}</h3>
            <p className={styles.institution}>{destaque.instituicao}</p>

            {pct !== null && (
              <div className={styles.progress}>
                <div className={styles.progressLabel}>
                  <span>
                    {destaque.inicioPeriodo} — {destaque.fimPeriodo}
                    {cursando(destaque) && ' (previsão)'}
                  </span>
                  <strong>{pct}%</strong>
                </div>
                <div
                  className={styles.bar}
                  role="progressbar"
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Progresso do curso"
                >
                  <div className={styles.fill} style={{ width: `${pct}%` }} />
                </div>
              </div>
            )}

            {destaque.destaques && destaque.destaques.length > 0 && (
              <>
                <h4 className={styles.subjectsLabel}>Disciplinas cursadas</h4>
                <div className={styles.subjects} id="disciplinas">
                  {(todas ? destaque.destaques : destaque.destaques.slice(0, PRINCIPAIS)).map(d => (
                    <span key={d} className={styles.subject}>
                      {d}
                    </span>
                  ))}
                  {destaque.destaques.length > PRINCIPAIS && (
                    <button
                      type="button"
                      className={styles.toggle}
                      aria-expanded={todas}
                      aria-controls="disciplinas"
                      onClick={() => setTodas(t => !t)}
                    >
                      {todas ? 'Ver menos' : `Ver todas (${destaque.destaques.length})`}
                    </button>
                  )}
                </div>
              </>
            )}
          </article>

          {outras.length > 0 && (
            <ul className={styles.others}>
              {outras.map(f => (
                <li key={f.id} className={styles.other}>
                  <span className={styles.check} aria-hidden="true">
                    {cursando(f) ? '…' : '✓'}
                  </span>
                  <div>
                    <h3 className={styles.otherCourse}>{f.curso}</h3>
                    <p className={styles.institution}>{f.instituicao}</p>
                    <p className={styles.otherPeriod}>
                      {f.inicioPeriodo} — {f.fimPeriodo ?? 'Atual'}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  )
}

export default Academic
