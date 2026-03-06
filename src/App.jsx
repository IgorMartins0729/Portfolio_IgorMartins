import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import InfoProfile from './components/InfoProfile/InfoProfile'
import AboutMe from './components/AboutMe/AboutMe'
import Academic from './components/Academic/Academic'
import Projects from './components/Projects/Projects'
import Skills from './components/Skills/Skills'
import Certificates from './components/Certificates/Certificates'
import Footer from './components/Footer/Footer'
/* rfce */

function App() {

  return (
    <main>
      <Header />
      <InfoProfile />
      <AboutMe />
      <Academic />
      <Projects />
      <Skills />
      <Certificates />
      <Footer />
    </main>
  )
}

export default App
