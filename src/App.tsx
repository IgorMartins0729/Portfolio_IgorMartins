import Home from '@/pages/Home/Home'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import { CyberBackground } from '@/components/CyberBackground/CyberBackground'

function App() {
  return (
    <div className="relative min-h-screen">
      <CyberBackground />

      <div className="relative z-10">
        <Navbar />
        <Home />
        <Footer />
      </div>
    </div>
  )
}

export default App