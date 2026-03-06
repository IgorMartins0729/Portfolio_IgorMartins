import './Skills.css';

// Arrays separados para facilitar a manutenção
const hardSkills = [
  { id: 1, nome: "React", icone: "⚛️" },
  { id: 2, nome: "C#", icone: "⚙️" },
  { id: 3, nome: "SQL", icone: "🗄️" },
  { id: 4, nome: "Git", icone: "🐙" },
  { id: 5, nome: "Angular", icone: "🅰️" },
  { id: 6, nome: "Figma", icone: "🎨" },
];

const softSkills = [
  { id: 1, nome: "Resolução de Problemas" },
  { id: 2, nome: "Aprendizado Contínuo" },
  { id: 3, nome: "Pensamento Analítico" },
  { id: 4, nome: "Trabalho em Equipe" }
];

function Skills() {
  return (
    <section id="skills" className="skills-container">
      <h2>Minhas Habilidades</h2>
      
      <div className="skills-content">
        {/* Coluna das Hard Skills */}
        <div className="hard-skills-box">
          <h3>Hard Skills</h3>
          <div className="hard-skills-grid">
            {hardSkills.map((skill) => (
              <div className="skill-card" key={skill.id}>
                <span className="skill-icon">{skill.icone}</span>
                <span className="skill-name">{skill.nome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna das Soft Skills */}
        <div className="soft-skills-box">
          <h3>Soft Skills</h3>
          <ul className="soft-skills-list">
            {softSkills.map((skill) => (
              <li key={skill.id}>
                <span className="check-icon">✔️</span> {skill.nome}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Skills;