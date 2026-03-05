import React from 'react'
import './AboutMe.css'

function AboutMe() {
  return (
    <div >
        <div className='title-aboutme'>
            <h1>Sobre mim</h1>
        </div>
        <div className="container-aboutme">
            
            <div> 
              <h2 className='title-container'>Meus Objetivos</h2>
              <div className="item-container">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad itaque rerum fugiat nobis alias consectetur praesentium reprehenderit in consequatur? Voluptatem illum repellat repellendus ratione beatae reprehenderit aut ipsam consequuntur explicabo.</p>
              </div>
            </div>


            <div>
              <h2 className='title-container'>Experiência Profissional</h2>
              <div className="item-container">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam sequi labore cumque et? Modi obcaecati commodi repudiandae aperiam consequuntur facilis? Voluptatem dicta earum laborum voluptate maxime aut dolorum minima tempore?</p>
              </div>
            </div>

        </div>
    </div>
  )
}

export default AboutMe