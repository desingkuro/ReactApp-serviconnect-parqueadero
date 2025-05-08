import Header from '../shared/components/Header'
import Footer from '../shared/components/Footer'

function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 text-left p-4">About</div>
      <Footer />
    </div>    
  )
}

export default About