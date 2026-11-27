import { useState } from 'react'
import styles from './experience.module.css'
import { getExperiencias } from '@/services/dataService'
import type { ProfessionalExperience } from '@/types/professional-experience'
import { mesAtual, paraMeses } from '@/utils/periodo'

// conta o mês inicial e o final, como o LinkedIn: "Dez 2025" a "Nov 2026" = 1 ano
function duracao(exp: ProfessionalExperience): string | null {
  const inicio = paraMeses(exp.inicioPeriodo)
  const fim = exp.fimPeriodo ? paraMeses(exp.fimPeriodo) : mesAtual()
  if (inicio === null || fim === null || fim < inicio) return null
  const total = fim - inicio + 1
  const anos = Math.floor(total / 12)
  const meses = total % 12
  const txtAnos = anos ? `${anos} ${anos === 1 ? 'ano' : 'anos'}` : ''
  const txtMeses = meses ? `${meses} ${meses === 1 ? 'mês' : 'meses'}` : ''
  return [txtAnos, txtMeses].filter(Boolean).join(' e ')
}

// sem data de saída = ainda trabalho lá
const empregoAtual = (exp: ProfessionalExperience) => !exp.fimPeriodo

const iniciais = (nome: string) =>
  nome
    .split(' ')
    .slice(0, 2)
    .map(p => p[0])
    .join('')
    .toUpperCase()

function Logo({ exp }: { exp: ProfessionalExperience }) {
  return (
    <span className={styles.logo}>
      {exp.logo ? (
        <img src={`${import.meta.env.BASE_URL}${exp.logo}`} alt={`Logo ${exp.empresa}`} />
      ) : (
        <span aria-hidden="true">{iniciais(exp.empresa)}</span>
      )}
    </span>
  )
}

function Experience() {
  const experiencias = getExperiencias()
  const [selecionadaId, setSelecionadaId] = useState(experiencias[0]?.id)
  const selecionada = experiencias.find(e => e.id === selecionadaId)

  return (
    <section id="experiencia" className={styles.main}>
      <span className={styles.tag}>Experiência profissional</span>
      <h2 className={styles.title}>Por onde passei.</h2>

      <div className={styles.layout}>
        {/* role e tabIndex: dá pra rolar a timeline pelo teclado também */}
        <div className={styles.scroller} tabIndex={0} role="region" aria-label="Linha do tempo de experiências">
          <ol className={styles.timeline}>
            {experiencias.map(exp => {
              const atual = empregoAtual(exp)
              const ativa = exp.id === selecionadaId
              return (
                <li key={exp.id} className={`${styles.item} ${atual ? styles.current : ''} ${ativa ? styles.active : ''}`}>
                  <span className={styles.dot} aria-hidden="true" />
                  <button
                    type="button"
                    className={styles.card}
                    aria-pressed={ativa}
                    aria-controls="experiencia-detalhes"
                    onClick={() => setSelecionadaId(exp.id)}
                  >
                    <Logo exp={exp} />
                    {/* spans: botão só aceita conteúdo inline */}
                    <span className={styles.info}>
                      <span className={styles.role}>{exp.cargo}</span>
                      <span className={styles.company}>{exp.empresa}</span>
                      <span className={styles.period}>
                        {exp.inicioPeriodo} — {exp.fimPeriodo ?? 'Atual'}
                      </span>
                    </span>
                    {atual && <span className={styles.badge}>Atual</span>}
                  </button>
                </li>
              )
            })}
          </ol>
        </div>

        {selecionada && (
          // key: reinicia a animação de entrada ao trocar de experiência
          <aside key={selecionada.id} id="experiencia-detalhes" className={styles.panel} aria-live="polite">
            <div className={styles.panelHeader}>
              <Logo exp={selecionada} />
              <div>
                <h3 className={styles.panelRole}>{selecionada.cargo}</h3>
                <p className={styles.company}>{selecionada.empresa}</p>
              </div>
            </div>

            <p className={styles.panelPeriod}>
              {selecionada.inicioPeriodo} — {selecionada.fimPeriodo ?? 'Atual'}
              {duracao(selecionada) && <span> · {duracao(selecionada)}</span>}
            </p>

            {selecionada.descricao && selecionada.descricao.length > 0 && (
              <>
                <h4 className={styles.panelLabel}>{empregoAtual(selecionada) ? 'O que eu faço' : 'O que eu fazia'}</h4>
                <ul className={styles.tasks}>
                  {selecionada.descricao.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            )}

            {selecionada.tecnologias && selecionada.tecnologias.length > 0 && (
              <>
                <h4 className={styles.panelLabel}>Tecnologias</h4>
                <div className={styles.techs}>
                  {selecionada.tecnologias.map(tec => (
                    <span key={tec} className={styles.tech}>
                      {tec}
                    </span>
                  ))}
                </div>
              </>
            )}
          </aside>
        )}
      </div>
    </section>
  )
}

export default Experience
