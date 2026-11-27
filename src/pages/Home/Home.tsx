import Hero from "@/pages/Home/sections/Hero"
import AboutMe from "@/pages/Home/sections/AboutMe"
import Academic from "@/pages/Home/sections/Academic"
import Experience from "@/pages/Home/sections/Experience"
import Projects from "@/pages/Home/sections/Projects"
import Skills from "@/pages/Home/sections/Skills"
import Certificates from "@/pages/Home/sections/Certificates"


function Home() {
  return (
    <main>
      <Hero />
      <AboutMe />
      <Experience />
      <Academic />
      <Projects />
      <Skills />
      <Certificates />
    </main>
  )
}

export default Home