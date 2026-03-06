import './Certificates.css';

const listaCertificados = [
  {
    id: 1,
    titulo: "ESCOLA DE INOVADORES",
    instituicao: "INOVA CPS",
    ano: "2025",
    linkCredencial: "./CERTIFICADO_-_2025-2.pdf"
  },
  {
    id: 2,
    titulo: "Introdução ao Scrum",
    instituicao: "FGV Online",
    ano: "2025",
    linkCredencial: "./scrum2.png"
  },
];

function Certificates() {
  return (
    <section id="certificates" className="certificates-container">
      <h2>Meus Certificados</h2>
      
      <div className="certificates-grid">
        {listaCertificados.map((cert) => (
          <div className="certificate-card" key={cert.id}>
            <div className="cert-icon">🎓</div>
            <div className="cert-info">
              <h3>{cert.titulo}</h3>
              <p className="cert-inst">{cert.instituicao}</p>
              <p className="cert-ano">{cert.ano}</p>
            </div>
            <a href={cert.linkCredencial} target="_blank" rel="noopener noreferrer" className="btn-credencial">
              Ver Credencial
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Certificates;