import { useState } from 'react'
import './index.css'

function AccountRegion() {
  const [videoSrc, setVideoSrc] = useState('')
  return (
    <div className="header-container">
      <div className="account-container">
          <div className="icon-container">
              <div className="icon-box">
                  <img src="../public/resource/img/icon-48.png" title="账号" alt="1" />
                  <div className="text-container">
                      <samp>账号</samp>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}
export default AccountRegion;