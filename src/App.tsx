import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import logo from './assets/logo.svg'
import CustomCursor from './components/customCursor.tsx'
import card1 from './assets/cards/card1.png'
import card2 from './assets/cards/card2.png'
import card3 from './assets/cards/card3.png'
import './styles/App.css'
import './styles/popup.css'
import FragmentMonoButton from './components/button.tsx'
import WigglingAsciiBackground from './components/asciiart.tsx'
import TypewriterText from './components/typewriter.tsx'
import CustomPopup from './components/customPopup.tsx'
import bookSvg from './assets/popup/book.png'

function App() {
  const [isRotating, setIsRotating] = useState(false);
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const openPopup = (popupType: string) => {
    setIsLoading(true);
    setActivePopup(popupType);
  };
  
  const closePopup = () => {
    setActivePopup(null);
    setIsLoading(false);
  };

  return (
    <Router>
      <WigglingAsciiBackground />
      <div className='App relative'>
        <CustomCursor />
        <header className='App-header'>
          <div className='logo-container'
            onMouseEnter={() => setIsRotating(true)}
            onMouseLeave={() => setIsRotating(false)}>
            <img src={logo} className={`logo ${isRotating ? 'rotating' : ''}` }
              alt="logo image"/>
          </div>
          <div className='nav-links'>
            <a href='#about'>about</a>
            <a href="https://www.linkedin.com/in/lina-lee0718/">linkedin</a>
            <a href="#resume">resume</a>
          </div>
        </header>
        <div className='body-container'>
          <div className='tagline-container'>
            <p>hi! my name is <span style={{ color:'var(--accent-colour)'}}>lina</span> and i'm an <span style={{ color:'var(--accent-colour)'}}>ux/product engineer</span></p>
            <TypewriterText text="↪ studying interactive media @ sheridan college 🥸" speed={60} />
          </div>
        </div>
        <div className='flex justify-around px-4 md:px-6 lg:px-8 mt-[25vh] mb-[25vh]'>
          <div className='mx-s md:mx-4'>
            <img src={card1} alt="card image for works" onClick={() => openPopup('works')} />
            <div onClick={() => openPopup('works')}>
              <FragmentMonoButton text="works"/>
            </div>
          </div>
          <div className='mx-s md:mx-4'>
            <img src={card2} alt="card image for playground" onClick={() => openPopup('playground')} />
            <div onClick={() => openPopup('playground')}>
              <FragmentMonoButton text="playground"/>
            </div>
          </div>
          <div className='mx-s md:mx-4'>
            <img src={card3} alt="card image for guestbook" onClick={() => openPopup('guestbook')} />
            <div onClick={() => openPopup('guestbook')}>
              <FragmentMonoButton text="guestbook"/>
            </div>
          </div>
        </div>
        
        {activePopup === 'works' && (
          <CustomPopup 
            isOpen={true} 
            onClose={closePopup} 
            backgroundImage={bookSvg}
          >
            {/* Works-specific content */}
          </CustomPopup>
        )}
        
        {activePopup === 'playground' && (
          <CustomPopup 
            isOpen={true} 
            onClose={closePopup} 
            backgroundImage={bookSvg}
          >
            {/* Playground-specific content */}
          </CustomPopup>
        )}
        
        {activePopup === 'guestbook' && (
          <CustomPopup 
            isOpen={true} 
            onClose={closePopup} 
            backgroundImage={bookSvg}
          >
            {/* Guestbook-specific content */}
          </CustomPopup>
        )}
        
        {/* Optional loading indicator when isLoading is true but popups aren't ready */}
        {isLoading && !activePopup && (
          <div className="popup-overlay">
            <div className="popup-loading">
              <div className="spinner"></div>
              <p>Loading...</p>
            </div>
          </div>
        )}
      </div>
    </Router>
  )
}

export default App