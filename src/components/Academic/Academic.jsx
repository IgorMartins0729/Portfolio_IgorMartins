import './Academic.css';
import icon1 from "../../assets/Group2.svg";
import icon2 from "../../assets/Vector3.svg";
import icon3 from "../../assets/4.svg";

function Academic() {
  return (
    <section id="academic" className="section-academic">
        <div className="title-academic">
            <h1>Formação Acadêmica</h1>
        </div>
        
        <div className='container-card'>
            
            <div className="card">
                <div className="img-card">
                    <img src={icon1} className='icon1' alt="Ícone Fatec" />
                    <img src={icon2} className='icon2' alt="Detalhe Fatec" />
                </div>
                <div className='content-card'>
                    <h2>Desenvolvimento de Software Multiplataforma</h2>
                    <h3>FATEC São José dos Campos</h3>
                    <p>Início: 01/2022  -  Previsão: 02/2028</p>
                </div>
           </div>
        
            <div className="card">
                <div className="img-card">
                    <img src={icon1} className='icon1' alt="Ícone Colégio" />
                    <img src={icon3} className='icon3' alt="Detalhe Colégio"/>
                </div>
                
                <div className='content-card'>
                    <h2>Técnico de Informática</h2>
                    <h3>Colégio Joseense</h3>
                    <p>Início: 01/2022  -  Conclusão: 02/2028</p>
                </div>
            </div>

        </div>      
    </section>
  )
}

export default Academic;