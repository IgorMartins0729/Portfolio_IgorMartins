import React from 'react'
import Navbar from "../../../components/Navbar/Navbar"
import Footer from "../../../components/Footer/Footer"
import Info from "./sections/Info/Info"
import AboutMe from "./sections/AboutMe/AboutMe"
import Academic from "./sections/Academic/Academic"
import Projects from "./sections/Projects/Projects"
import Skills from "./sections/Skills/Skills"
import Certificates from "./sections/Certificates/Certificates"
import Contact from "./sections/Contact/Contact"


function Home() {
  return (
    <main>
      <Navbar></Navbar>
      <Info></Info>
      <AboutMe></AboutMe>
      <Academic></Academic>
      <Projects></Projects>
      <Skills></Skills>
      <Certificates></Certificates>
      <Contact></Contact>
      <Footer></Footer>
    </main>
  )
}

export default Home