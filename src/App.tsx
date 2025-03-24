import { useState } from 'react';
import './App.css'
import logo from './assets/logo.svg'

function App() {

    const [isRotating, setIsRotating] = useState(false);

  return (
    <div className='App'>

        <header className='App-header'>
            <div className='logo-container'
                onMouseEnter={() => setIsRotating(true)}
                onMouseLeave={() => setIsRotating(false)}>
                    <img src={logo} className={`logo ${isRotating ? 'rotating' : ''}` }
                        alt="logo image"/>
            </div>
        </header>

        <div className='body-container'>

            <div className='tagline-container'>
                <p>hi! my name is <span style={{ color:'var(--accent-colour)'}}>lina</span> and i'm an (aspiring) <span style={{ color:'var(--accent-colour)'}}>ux/product engineer 🥸</span></p>
            </div>

            <p>hello!</p>
        </div>

    </div>
)
}

export default App
