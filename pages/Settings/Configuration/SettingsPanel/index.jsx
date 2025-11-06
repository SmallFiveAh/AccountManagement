import { useState, useEffect } from 'react'
import AccountToken from './AccountToken'
import './index.css'

function SettingsPanel ({isPanelOpen, setIsPanelOpen}) { 
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isPanelOpen) {
            setIsOpen(true);
            // 添加一个小延迟来确保元素已经渲染后再触发动画
            setTimeout(() => {
                setIsAnimating(true);
            }, 10);
        } else if (isOpen) {
            setIsAnimating(false);
            // 动画结束后隐藏面板
            const timer = setTimeout(() => {
                setIsOpen(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isPanelOpen]);

    const setRegionisPanelOpen = (e) => {
      if (e.target.id === 'add-account-modal') {
        setIsPanelOpen(false)
      }
    }
    
    if (!isOpen && !isAnimating) return null;
    
    return (
        <div
          id="add-account-modal"
          className={`modal-overlay ${isAnimating ? 'open' : ''}`}
          onClick={setRegionisPanelOpen}
          >
            <div className="modal-content">
                <div className="complete-btn" title="关闭" onClick={setIsPanelOpen}>&times;</div>
                <AccountToken />
            </div>
        </div>
    )
}

export default SettingsPanel;