import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Certificates.css';


const cursosBase = [
  {
    id: 1,
    titulo: "Fundamentos de UI/UX",
    instituicao: "Plataforma Design",
    ano: "2024",
    linkCredencial: "#"
  }
];

function Certificates() {
  const [listaCertificados, setListaCertificados] = useState([]);

 
  useEffect(() => {
    
    const cursosSalvos = JSON.parse(localStorage.getItem('meusCursos'));
    
    if (cursosSalvos && cursosSalvos.length > 0) {
      setListaCertificados(cursosSalvos);
    } else {
      setListaCertificados(cursosBase);
      
      localStorage.setItem('meusCursos', JSON.stringify(cursosBase));
    }
  }, []); 

  return (
    <section id="certificates" className="certificates-container">
      <h2>Meus Certificados</h2>
      
      
      <div className="header-certificates">
         <Link to="/adicionar-curso" className="btn-add-course">
           + Adicionar mais cursos
         </Link>
      </div>

      <div className="certificates-grid">
        {listaCertificados.map((cert) => (
          <div className="certificate-card" key={cert.id}>
            <div className="cert-icon">🎓</div>
            <div className="cert-info">
              <h3>{cert.titulo}</h3>
              <p className="cert-inst">{cert.instituicao}</p>
              <p className="cert-ano">{cert.ano}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Certificates;