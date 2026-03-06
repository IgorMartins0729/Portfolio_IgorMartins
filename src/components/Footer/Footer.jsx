import './Footer.css';

function Footer() {
  
  const anoAtual = new Date().getFullYear();

  return (
    <footer id="contact" className="footer-container">
      <div className="footer-content">
        <h2>Vamos conversar?</h2>
        <p>Estou sempre aberto a novas oportunidades, troca de ideias e projetos criativos.</p>
        
        <div className="footer-links">
         
          <a href="https://github.com/IgorMartins0729" target="_blank" rel="noopener noreferrer" className="footer-btn">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/igormrtns/" target="_blank" rel="noopener noreferrer" className="footer-btn">
            LinkedIn
          </a>
          
          <a href="mailto:seuemail@exemplo.com" className="footer-btn highlight-btn">
            Enviar E-mail
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {anoAtual} Igor Martins. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;