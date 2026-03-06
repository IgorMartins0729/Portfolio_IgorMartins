import './AboutMe.css'

function AboutMe() {
  const obterSaudacao = () => {
    const horaAtual = new Date().getHours();
    if (horaAtual >= 5 && horaAtual < 12) {
      return 'Bom dia!';
    } else if (horaAtual >= 12 && horaAtual < 18) {
      return "Boa tarde!";
    } else {
      return "Boa noite!";
    }
  }

  return (
    <section id="aboutme" className="section-aboutme">
        <div className='title-aboutme'>
            <h1>Sobre mim</h1>
        </div>
        
        <div className="container-aboutme">
            
            <div className="box-info"> 
              <h2 className='title-container'>Meus Objetivos</h2>
              <div className="item-container text-content">
                <p>
                  {obterSaudacao()} Meu nome é Igor e sou estudante na área de tecnologia, com interesse em desenvolvimento. 
                  Tenho experiência com linguagens de programação, versionamento com Git e criação de interfaces focadas em 
                  usabilidade e experiência do usuário. Busco sempre aprimorar minhas habilidades por meio de projetos acadêmicos e 
                  aplicando na prática o que aprendo durante minha formação na FATEC São José dos Campos.
                </p>
              </div>
            </div>

            <div className="box-info">
              <h2 className='title-container'>Experiência Profissional</h2>
              <div className="item-container xp-content">
                <div className="xp-item">
                  <h4>Kaffa Tech</h4>
                  <p className="xp-role">Estagiário de Desenvolvimento de Software</p>
                  <p className="xp-date">Dez 2025 - Atual</p>
                </div>
                
                <div className="xp-item">
                  <h4>Sonaca Brasil</h4>
                  <p className="xp-role">Auxiliar de T.I</p>
                  <p className="xp-date">Mar 2024 - Jun 2025</p>
                </div>
              </div>
            </div>

        </div>
    </section>
  )
}

export default AboutMe