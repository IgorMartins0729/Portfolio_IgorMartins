import styles from './Skills.module.css'
import { getHabilidades } from '@/services/dataService'

// versão fixa: um update do Devicon não muda os ícones sem a gente saber
const DEVICON = 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/'

function Skills() {
  const { hardSkills, softSkills } = getHabilidades()

  return (
    <section id="skills" className={styles.main}>
      <span className={styles.tag}>Hard &amp; Soft Skills</span>
      <h2 className={styles.title}>Minhas ferramentas.</h2>

      {hardSkills.length > 0 && (
        <div className={styles.block}>
          <h3 className={styles.label}>Hard skills</h3>
          <div className={styles.categories}>
            {hardSkills.map(cat => (
              <div key={cat.categoria} className={styles.category}>
                <h4 className={styles.categoryName}>
                  {cat.categoria}
                  <span className={styles.categoryCount}>{cat.itens.length}</span>
                </h4>
                <ul className={styles.techs}>
                  {cat.itens.map(tec => (
                    <li key={tec.nome} className={styles.tech}>
                      <span className={styles.icon}>
                        {tec.icone ? (
                          <img
                            src={`${DEVICON}${tec.icone}.svg`}
                            alt=""
                            loading="lazy"
                            className={tec.inverterIcone ? styles.inverted : undefined}
                          />
                        ) : (
                          <span aria-hidden="true">{tec.nome[0]}</span>
                        )}
                      </span>
                      {tec.nome}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {softSkills.length > 0 && (
        <div className={styles.block}>
          <h3 className={styles.label}>Soft skills</h3>
          <ol className={styles.softGrid}>
            {softSkills.map((skill, i) => (
              <li key={skill} className={styles.soft}>
                <span className={styles.number}>{String(i + 1).padStart(2, '0')}</span>
                {skill}
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  )
}

export default Skills
