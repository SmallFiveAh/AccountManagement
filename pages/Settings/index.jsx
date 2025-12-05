import Monitor from './monitor';
import { StrictMode } from 'react'
import Masklayer from './Masklayer'
import { createRoot } from 'react-dom/client'
import AccountRegion from './AccountRegion';
import Configuration from './Configuration';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Masklayer />
    <div className="main-container">
      <AccountRegion />
      <Configuration />
      <Monitor />
    </div>
  </StrictMode>,
)
