import { useState } from 'react'
import './index.css'

function SettingsPanel ({isPanelOpen, setIsPanelOpen}) { 
    const setRegionisPanelOpen = (e) => {
      if (e.target.id === 'add-account-modal') {
        setIsPanelOpen(false)
      }
    }
    return (
        <div
          id="add-account-modal"
          className="modal-overlay"
          style={{ display: isPanelOpen ? 'flex' : 'none' }}
          onClick={setRegionisPanelOpen}
          >
            <div className="modal-content">
                <button className="complete-btn" title="关闭" onClick={setIsPanelOpen}>&times;</button>
            </div>
        </div>
    )
}

export default SettingsPanel;
