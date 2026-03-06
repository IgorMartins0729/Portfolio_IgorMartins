import './Projects.css';

const listaDeProjetos = [
  {
    id: 1,
    titulo: "Dashboard Peste Negra",
    descricao: "Projeto de visualização de dados e estatísticas detalhadas com interface web.",
    tecnologias: ["Python", "HTML/CSS"],
    linkGithub: "https://github.com/IgorMartins0729/Project_Noire"
  },
  {
    id: 2,
    titulo: "Análise do Censo 2022 em São José dos Campos",
    descricao: "lataforma, acessível e interativa que transforme os dados brutos do Censo 2022 em informações claras e dinâmicas, permitindo à Secretaria Municipal de Planejamento Urbano de São José dos Campos responder rapidamente às demandas da população",
    tecnologias: ["Python", "HTML/CSS"],
    linkGithub: "https://github.com/FATCK06/ProjectAPI_FirstSemester"
  },
];

function Projects() {
  return (
    <section id="projects" className="projects-container">
      <h1>Meus Projetos</h1>
      
      <div className="projects-grid">
        
        {listaDeProjetos.map((projeto) => (
          
          <div className="project-card" key={projeto.id}>
            <h3>{projeto.titulo}</h3>
            <p>{projeto.descricao}</p>
            
            <div className="tags-tecnologias">
              {projeto.tecnologias.map((tech, index) => (
                <span key={index} className="tag">{tech}</span>
              ))}
            </div>

            <a href={projeto.linkGithub} target="_blank" rel="noopener noreferrer" className="btn-repo">
              Ver Repositório
            </a>
          </div>

        ))}

      </div>
    </section>
  );
}

export default Projects;