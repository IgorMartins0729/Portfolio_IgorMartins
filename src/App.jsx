import { BrowserRouter, Routes, Route } from 'react-router-dom';
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


import AddCourse from './components/AddCourse/AddCourse' 

function App() {
  return (
    <BrowserRouter basename='Portfolio_IgorMartins'>
      <Routes>
        
        <Route path="/" element={
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
        } />

        <Route path="/adicionar-curso" element={<AddCourse />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App