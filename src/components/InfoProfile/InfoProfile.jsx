import './InfoProfile.css'

function InfoProfile() {
  return (
    <div className='container-infoprofile'>
        <div className='img-main'>
            {/* Tiramos a barra antes do nome do arquivo */}
            <img src="imgphotoigor.jpg" alt="Foto Igor" />
        </div>
        
        <div className='title-name'>
            <h1>Igor Martins</h1>
        </div>

        <div className='social-media'>
            <a href="https://github.com/IgorMartins0729" target="_blank" rel="noopener noreferrer">
              {/* Sem a barra inicial */}
              <img src="github.png" alt="GitHub" />
            </a>
            <a href="https://www.linkedin.com/in/igormrtns/" target="_blank" rel="noopener noreferrer">
              {/* Sem a barra inicial */}
              <img src="linkedin.png" alt="LinkedIn" />
            </a>
        </div>

        <div className='btn-upload-cv'>
          <a 
            href="Curriculo_IgorMartins.pdf" 
            download="Curriculo_IgorMartins.pdf" 
            className="btn-download"
          >
            BAIXAR CURRÍCULO
          </a>
        </div>
    </div>
  )
}

export default InfoProfile