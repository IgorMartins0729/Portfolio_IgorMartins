import './InfoProfile.css'

function InfoProfile() {
  return (
    <div className='container-infoprofile'>
        <div className='img-main'>
            <img src="./imgphotoigor.jpg" alt="" />
        </div>
        <div className='title-name'>
            <h1>Igor Martins</h1>
        </div>

        <div className='social-media'>
            <a href="https://github.com/IgorMartins0729">
              <img src="./github.png"alt="" />
            </a>
            <a href="https://www.linkedin.com/in/igormrtns/">
              <img src="./linkedin.png"alt="" />
            </a>
            
            {/* <img src="" alt="" /> */}
        </div>

        <div className='btn-upload-cv'>
          <button>BAIXAR CURRÍCULO</button>
        </div>
    </div>
  )
}

export default InfoProfile