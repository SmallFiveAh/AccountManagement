import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Masklayer from './Masklayer'
import AccountRegion from './AccountRegion';
import Configuration from './Configuration';
import Partitionbar from './Partitionbar';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Masklayer />
    <div className="main-container">
      <AccountRegion />
      <Configuration />
      <Partitionbar />
    </div>
  </StrictMode>,
)
