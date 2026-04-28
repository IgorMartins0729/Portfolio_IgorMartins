import Info from "./components/Info/Info"
import Navbar from "./components/Navbar/Navbar"
import AboutMe from "./components/AboutMe/AboutMe"
import Academic from "./components/Academic/Academic"
import Projects from "./components/Projects/Projects"
import Skills from "./components/Skills/Skills"
import Certificates from "./components/Certificates/Certificates"
import Contact from "./components/Contact/Contact"
import Footer from "./components/Footer/Footer"

function App() {
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

export default App