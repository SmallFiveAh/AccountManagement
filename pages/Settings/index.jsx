import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Masklayer from './Masklayer'
import AccountRegion from './AccountRegion';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Masklayer />
    <AccountRegion />
  </StrictMode>,
)
