import { use, useEffect, useState } from 'react'
import logo from './assets/logo.svg'
import CustomCursor from './customCursor'
import card1 from './assets/cards/card1.png'
import card2 from './assets/cards/card2.png'
import card3 from './assets/cards/card3.png'
import './App.css'
import './button.tsx'
import FragmentMonoButton from './button.tsx'
import WigglingAsciiBackground from './asciiart.tsx'
import TypewriterText from "./typewriter.tsx";

function App() {

    const [isRotating, setIsRotating] = useState(false);
    const [isGuestbookOpen, setIsGuestbookOpen] = useState(false);

  return (
    <div className='main'>
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
                    <a href="#about">about</a>
                    <a href="#linkedin">linkedin</a>
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
                    <img src={card1} alt="card image for works" />
                    <div className='mt-6'>
                        <FragmentMonoButton text="works"/>
                    </div>
                </div>
                <div className='mx-s md:mx-4'>
                    <img src={card2} alt="card image for playground" />
                    <div className='mt-6'>
                        <FragmentMonoButton text="playground"/>
                    </div>
                </div>
                <div className='mx-s md:mx-4'>
                    <img src={card3} alt="card image for guestbook" />
                    <div className='mt-6'>
                        <FragmentMonoButton text="guestbook"/>
                    </div>
                </div>
            </div>

        </div>
    </div>
)
}

export default App
